var authToken = null;
var lastTokenTime = null;

Cypress.Commands.add("GetAuthToken", () => {
  const now = new Date().getTime();

  if (lastTokenTime == null) {
    lastTokenTime = now;
  }

  if (now - lastTokenTime >= Cypress.config().authTokenTimeOut) {
    var formBody = [];
    formBody.push("grant_type=client_credentials");
    formBody = formBody.join("&");
    cy.request({
      method: "POST",
      url:
        "https://" +
        Cypress.config().projectID +
        ":" +
        Cypress.config().projectAPIKey +
        "@api.up42.com/oauth/token",
      form: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
      redirect: "follow",
    }).then((result) => {
      authToken = JSON.stringify(result.body["data"]["accessToken"]);
    });
  }
});

Cypress.Commands.add("AddFlow", () => {
  cy.GetAuthToken().then(() => {
    var raw = JSON.stringify({
      name: "QA coding challenge workflow123",
      description: "Workflow description",
    });
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + authToken);
    myHeaders.append("Content-Type", "application/json");

    cy.request({
      method: "POST",
      url:
        "https://api.up42.com/projects/" +
        Cypress.config().projectID +
        "/workflows/",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    });
  });
});

Cypress.Commands.add("CreateJobAndRunJob", (workFlowId) => {
  cy.GetAuthToken().then(() => {
    var raw = JSON.stringify({
      "nasa-modis:1": {
        time: "2018-12-01T00:00:00+00:00/2020-12-31T23:59:59+00:00",
        limit: 1,
        zoom_level: 9,
        imagery_layers: ["MODIS_Terra_CorrectedReflectance_TrueColor"],
        bbox: [13.365373, 52.49582, 13.385796, 52.510455],
      },
      "sharpening:1": {
        strength: "medium",
      },
    });
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + authToken);
    myHeaders.append("Content-Type", "application/json");

    cy.request({
      method: "POST",
      url:
        "https://api.up42.com/projects/" +
        Cypress.config().projectID +
        "/workflows/" +
        workFlowId +
        "/jobs",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    });
  });
});

Cypress.Commands.add("GetJobDetails", (jobId) => {
  cy.GetAuthToken().then(() => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + authToken);

    cy.request({
      method: "GET",
      url:
        "https://api.up42.com/projects/" +
        Cypress.config().projectID +
        "/jobs/" +
        jobId,
      headers: myHeaders,
      redirect: "follow",
    });
  });
});

Cypress.Commands.add("DeleteWorkflow", (workFlowId) => {
  cy.GetAuthToken().then(() => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + authToken);

    cy.request({
      method: "DELETE",
      url:
        "https://api.up42.com/projects/" +
        Cypress.config().projectID +
        "/workflows/" +
        workFlowId,
      headers: myHeaders,
      redirect: "follow",
    });
  });
});

require("../support/commands");

describe("My First Test", () => {
  var workFlowId;

  before(function () {
    cy.AddFlow().then((result) => {
      workFlowId = JSON.stringify(result.body["data"]["accessToken"]);
    });
  });

  after(function () {
    cy.DeleteWorkflow(workFlowId).then((result) => {
      cy.log(
        "Workflow with id " +
          workFlowId +
          " was deleted with message " +
          JSON.stringify(result)
      );
    });
  });

  it("Create and run job - verify job details", () => {
    cy.CreateJobAndRunJob(workFlowId).then((jobDetails) => {
      expect(jobDetails).to.have.string("x");
      expect(jobDetails).to.have.string("y");
      expect(jobDetails).to.have.string("z");
    });
  });
});

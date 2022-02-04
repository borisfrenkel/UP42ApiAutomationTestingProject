require("../support/commands");

describe("Work flow tests", () => {
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

  it("Create and run job with valid input data - verify job details", () => {
    cy.CreateAndRunJob(workFlowId).then((jobDetails) => {
      expect(jobDetails).to.have.string("x");
      expect(jobDetails).to.have.string("y");
      expect(jobDetails).to.have.string("z");
    });
  });

  it("Create and run job with invalid auth token - verify error message", () => {
    cy.TryToCreateAndRunJobWithOutdatedToken(workFlowId).then((jobDetails) => {
      expect(jobDetails).to.have.string('"code":401');
      expect(jobDetails).to.have.string('"message":"Unauthorized"');
    });
  });

  it("Create and run job with not existing flow id - verify error message", () => {
    cy.CreateAndRunJob(Cypress.config().notExistingFlowId).then(
      (jobDetails) => {
        expect(jobDetails).to.have.string("x");
        expect(jobDetails).to.have.string("y");
      }
    );
  });
});

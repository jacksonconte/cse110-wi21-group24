describe("Testing the timer page", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/source");
    localStorage.setItem("workPomoTime", "0.05"); // 3 seconds each
    localStorage.setItem("shortBreakTime", "0.05");
    localStorage.setItem("longBreakTime", "0.05");
    cy.get("#openButton").click();
    cy.get("#tasksbtn").click();
  });

  it("Task starts and finishes", () => {
    cy.get("#input-task-name").clear().type("Test Task");
    cy.get("#input-pomos").clear().type("1");
    cy.get("#add-task-button").click();
    cy.get("task-item").shadow().find("#start0").click();
    cy.get("#toggle").click();
    setTimeout(3000, () => {
        expect(localStorage.get("curr-task")).to.equal(null);
    });
  });
});

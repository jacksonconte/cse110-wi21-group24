describe('Testing the Timer Page', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/source');
    localStorage.setItem('workPomoTime', '0.05'); // 3 seconds each
    localStorage.setItem('shortBreakTime', '0.05');
    localStorage.setItem('longBreakTime', '0.05');
    cy.get('#open-button').click();
    cy.get('#tasksbtn').click();
  });

  it('Task starts and finishes', () => {
    cy.get('#input-task-name').clear().type('Test Task');
    cy.get('#input-pomos').clear().type('1');
    cy.get('#add-task-button').click();
    cy.get('task-item').shadow().find('#start0').click();
    cy.get('#toggle')
      .click()
      .should(() => {
        expect(localStorage.getItem('curr-task')).to.not.equal(null);
      });
    cy.wait(3000);
    cy.get('#end-task')
      .click()
      .should(() => {
        expect(localStorage.getItem('curr-task')).to.equal(null);
      });
  });
});

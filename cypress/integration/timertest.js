describe('Testing the timer page', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/source');
        localStorage.setItem('workPomoTime', toString(1/60)); // 1 second each
        localStorage.setItem('shortBreakTime', toString(1/60));
        localStorage.setItem('longBreakTime', toString(1/60));
        cy.get('#openButton').click();
        cy.get('#tasksbtn').click();
    });

    it('Task starts and finishes', () => {
        cy.get('#input-task-name').clear().type('Test Task');
        cy.get('#input-pomos').clear().type('1');
        cy.get('#add-task-button').click();
        cy.get('.start-task-btn').click();
        setTimeout(1000, () => {
            expect(localStorage.get('curr-task')).to.equal(null);
        });
    });
});
describe('Testing the timer page', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/source');
        cy.get('#openButton').click();
        cy.get('#tasksbtn').click();
    });
});
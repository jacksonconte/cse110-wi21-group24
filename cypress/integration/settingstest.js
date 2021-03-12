describe('Settings test for Pomo Work Time', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/source');
        cy.get('#openButton').click();
        cy.get('#settingsbtn').click();
    });

    it('Check Pomo time inputs in Local Storage', () => {
        cy.get('#work-pomo-time').clear().type('30');
        cy.get('#short-break-time').clear().type('10');
        cy.get('#long-break-time').clear().type('45');
        cy.get('#submit-button').click().should(() => {
            expect(localStorage.getItem('workPomoTime')).to.equal('30');
            expect(localStorage.getItem('shortBreakTime')).to.equal('10');
            expect(localStorage.getItem('longBreakTime')).to.equal('45');
        });
        
        
    });

    it('Check for invalid inputs in Pomo times', () => {
        cy.get('#work-pomo-time').clear().type('-1');
        cy.get('input:invalid').should('have.length', 1);
        cy.get('#short-break-time').clear().type('-1');
        cy.get('input:invalid').should('have.length', 2);
        cy.get('#long-break-time').clear().type('-1');
        cy.get('input:invalid').should('have.length', 3);
    });
});
describe('Testing the Settings Page', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/source');
        cy.get('#openButton').click();
        cy.get('#settingsbtn').click();
    });

    it('Check Pomo time inputs in localStorage', () => {
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
        cy.get('input:invalid').should('have.length', 0);
        cy.get('#short-break-time').clear().type('-1');
        cy.get('input:invalid').should('have.length', 0);
        cy.get('#long-break-time').clear().type('-1');
        cy.get('input:invalid').should('have.length', 0);
    });

    it('Check analytics toggle in localStorage', () => {
        cy.get('#analytics-checkbox').check({force: true}).should(() => {
            expect(localStorage.getItem('analyticsToggle')).to.equal('1');
        });
        cy.get('#analytics-checkbox').uncheck({force: true}).should(() => {
            expect(localStorage.getItem('analyticsToggle')).to.equal('0');
        });
    });

    it('Check dark mode toggle in localStorage', () => {
        cy.get('#dark-mode').check({force: true}).should(() => {
            expect(localStorage.getItem('darkModeToggle')).to.equal('1');
        });
        cy.get('#dark-mode').uncheck({force: true}).should(() => {
            expect(localStorage.getItem('darkModeToggle')).to.equal('0');
        });
    });

    it('Check if analytics toggle makes analytics page appear/disappear', () => {
        cy.get('#analytics-checkbox').uncheck({force: true});
        cy.get('#openButton').click();
        cy.get('#analyticsbtn').should('have.css', 'display', 'none');
        cy.get('#analytics-checkbox').check({force: true});
        cy.get('#openButton').click();
        cy.get('#analyticsbtn').should('have.css', 'display', 'block');
    });
});
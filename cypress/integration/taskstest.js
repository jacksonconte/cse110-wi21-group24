describe('Testing the Task List Page', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/source');
        cy.get('#openButton').click();
        cy.get('#tasksbtn').click();
    });

    it('Add two elements to local storage, test if remove removes task from local storage. Test if you can start the second.', () => {
        cy.get('#input-task-name').clear().type('hello');
        cy.get('#input-pomos').clear().type('10');
        cy.get('#add-task-button').click().should(() => {
            expect(JSON.parse(localStorage.getItem('tasks'))[0][0]).to.equal('hello');
            expect(JSON.parse(localStorage.getItem('tasks'))[0][1]).to.equal('10');
        });

        cy.get('#input-task-name').clear().type('hello2');
        cy.get('#input-pomos').clear().type('7');
        cy.get('#add-task-button').click().should(() => {
            expect(JSON.parse(localStorage.getItem('tasks'))[1][0]).to.equal('hello2');
            expect(JSON.parse(localStorage.getItem('tasks'))[1][1]).to.equal('7');
            
        });
        cy.get('task-item').shadow().find('#remove0').click().should(() => {
            expect(JSON.parse(localStorage.getItem('tasks'))[0]).to.equal(undefined)
        })
        
        
        cy.get('task-item').shadow().find('#start1').click()
        cy.get('#timer').should('be.visible')
    });
});
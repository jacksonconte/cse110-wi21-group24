describe('Testing the Analytics Page', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/source/');
  });

  it('When no tasks completed, message displays', () => {
    cy.get('#open-button').click();
    cy.get('#analyticsbtn').click();
    cy.get('#task-select').should('not.be.visible');
    cy.get('#no-tasks').should('be.visible');
  });

  it('1 task completed test, graph test', () => {
    window.localStorage.setItem(
      'finished-tasks',
      '{"0":["test1","10",5,[170,1000,2000],[["wc",181],["w",1500],["sb",300],["w",1200],["sbc",100],["sb",180],["w",1200],["sb",120],["wc",60],["w",1500],["lb",900],["w",1800]],8991]}'
    );
    cy.get('#open-button').click();
    cy.get('#analyticsbtn').click();
    cy.get('#analytics').should('be.visible');
    cy.get('#comp-tasks-dropdown').children().should('have.length', 2);

    cy.get('#comp-tasks-dropdown').select('test1');

    cy.get('#progress-rect-0').trigger('mouseover');
    cy.get('#svg-label').contains(
      'This was a Cancelled Work Pomo that lasted 3 minutes and 1 seconds.'
    );
    cy.get('#progress-rect-1').trigger('mouseover');
    cy.get('#svg-label').contains(
      'This was a Work Pomo that lasted 25 minutes and 0 seconds.'
    );
    cy.get('#progress-rect-2').trigger('mouseover');
    cy.get('#svg-label').contains(
      'This was a Short Break that lasted 5 minutes and 0 seconds.'
    );
    cy.get('#progress-rect-3').trigger('mouseover');
    cy.get('#svg-label').contains(
      'This was a Work Pomo that lasted 20 minutes and 0 seconds.'
    );
    cy.get('#progress-rect-4').trigger('mouseover');
    cy.get('#svg-label').contains(
      'This was a Cancelled Short Break that lasted 1 minutes and 40 seconds.'
    );
    cy.get('#progress-rect-10').trigger('mouseover');
    cy.get('#svg-label').contains(
      'This was a Long Break that lasted 15 minutes and 0 seconds.'
    );
    cy.get('#dist-rect-0').trigger('mouseover');
    cy.get('#svg-label').contains(
      'This was a distraction logged at 2 minutes and 50 seconds in.'
    );
    cy.get('#dist-rect-1').trigger('mouseover');
    cy.get('#svg-label').contains(
      'This was a distraction logged at 16 minutes and 40 seconds in.'
    );

    cy.get('#stat-est-pomo').contains('Estimated Work Pomos: 10');
    cy.get('#stat-act-pomo').contains('Completed Work Pomos: 5');
    cy.get('#stat-distractions').contains('Distractions Logged: 3');
    cy.get('#stat-cancelled-pomo').contains('Cancelled Work Pomos: 2');

    cy.get('#dist-rect-1').trigger('mouseout');
    cy.get('#svg-label').contains('Hover to Display Info');
  });

  it('Multiple completed tasks dropdown test', () => {
    window.localStorage.setItem(
      'finished-tasks',
      '{"0":["test1","10",1,[170],[["w",1500]],1500],"1":["test2","10",1,[200],[["w",1200]],1200],"2":["test3","5",3,[170, 1000],[["w",1500],["sb",120],["w",1000]],2620]}'
    );
    cy.get('#open-button').click();
    cy.get('#analyticsbtn').click();
    cy.get('#comp-tasks-dropdown').children().should('have.length', 4);

    cy.get('#comp-tasks-dropdown').select('test1');
    cy.get('#progress-rect-0').trigger('mouseover');
    cy.get('#svg-label').contains(
      'This was a Work Pomo that lasted 25 minutes and 0 seconds.'
    );
    cy.get('#progress-rect-1').should('not.exist');
    cy.get('#dist-rect-0').trigger('mouseover');
    cy.get('#svg-label').contains(
      'This was a distraction logged at 2 minutes and 50 seconds in.'
    );
    cy.get('#stat-est-pomo').contains('Estimated Work Pomos: 10');
    cy.get('#stat-act-pomo').contains('Completed Work Pomos: 1');
    cy.get('#stat-distractions').contains('Distractions Logged: 1');
    cy.get('#stat-cancelled-pomo').contains('Cancelled Work Pomos: 0');

    cy.get('#comp-tasks-dropdown').select('test3');
    cy.get('#progress-rect-0').trigger('mouseover');
    cy.get('#svg-label').contains(
      'This was a Work Pomo that lasted 25 minutes and 0 seconds.'
    );
    cy.get('#progress-rect-1').trigger('mouseover');
    cy.get('#svg-label').contains(
      'This was a Short Break that lasted 2 minutes and 0 seconds.'
    );
    cy.get('#progress-rect-2').trigger('mouseover');
    cy.get('#svg-label').contains(
      'This was a Work Pomo that lasted 16 minutes and 40 seconds.'
    );
    cy.get('#dist-rect-0').trigger('mouseover');
    cy.get('#svg-label').contains(
      'This was a distraction logged at 2 minutes and 50 seconds in.'
    );
    cy.get('#dist-rect-1').trigger('mouseover');
    cy.get('#svg-label').contains(
      'This was a distraction logged at 16 minutes and 40 seconds in.'
    );
    cy.get('#stat-est-pomo').contains('Estimated Work Pomos: 5');
    cy.get('#stat-act-pomo').contains('Completed Work Pomos: 3');
    cy.get('#stat-distractions').contains('Distractions Logged: 2');
    cy.get('#stat-cancelled-pomo').contains('Cancelled Work Pomos: 0');

    cy.get('#comp-tasks-dropdown').select('test2');
    cy.get('#progress-rect-0').trigger('mouseover');
    cy.get('#svg-label').contains(
      'This was a Work Pomo that lasted 20 minutes and 0 seconds.'
    );
    cy.get('#progress-rect-1').should('not.exist');
    cy.get('#dist-rect-0').trigger('mouseover');
    cy.get('#svg-label').contains(
      'This was a distraction logged at 3 minutes and 20 seconds in.'
    );
    cy.get('#stat-est-pomo').contains('Estimated Work Pomos: 10');
    cy.get('#stat-act-pomo').contains('Completed Work Pomos: 1');
    cy.get('#stat-distractions').contains('Distractions Logged: 1');
    cy.get('#stat-cancelled-pomo').contains('Cancelled Work Pomos: 0');
  });
});

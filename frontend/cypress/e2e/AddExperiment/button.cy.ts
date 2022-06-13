describe('Loads add experiment page', () => {
  beforeEach(() => {
    cy.visit('http://131.170.250.223/login');
    cy.get('#\\:r0\\:').type('c');
    cy.get('#\\:r1\\:').type('#RMIT1234#');
    cy.get(':nth-child(3) > .MuiButton-root').click();
    cy.get('#\\:r0\\:').should('have.value', 'c');
    cy.get('#\\:r1\\:').should('have.value', '#RMIT1234#');
  });

  it('displays the add experiment button', () => {
    cy.get('[data-testid="AddRoundedIcon"]').click();
    cy.get('.MuiList-root > [tabindex="0"]').click();
    cy.get('#\\:r3\\:').type('test').should('have.value', 'test');
    cy.get('#\\:r4\\:').type('test').should('have.value', 'test');
    cy.get('#\\:r5\\:')
      .type('RMIT Parabolic Flight 1 (2022)')
      .type('{downArrow}{enter}')
      .should('have.value', 'RMIT Parabolic Flight 1 (2022)');
    cy.get('#\\:r8\\:').type('Scientific Research{downArrow}{enter}').should('have.value', 'Scientific Research');
    cy.get('#\\:ra\\:').type('Pure Basic Research{downArrow}{enter}').should('have.value', 'Pure Basic Research');
    cy.get('#\\:rc\\:')
      .type('300101{downArrow}{enter}', { delay: 400 })
      .should('have.value', '300101 Agricultural Biotechnology Diagnostics (Incl. Biosensors)');
    cy.get('#\\:re\\:')
      .click()
      .type('280123{downArrow}{enter}', { delay: 200 })
      .should('have.value', '280123 Expanding Knowledge In Human Society');
    cy.get('form.MuiBox-root > .MuiButton-root').should('be.visible');
  });
});

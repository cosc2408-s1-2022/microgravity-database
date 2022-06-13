describe('Loads Login page', () => {
  beforeEach(() => {
    cy.visit('http://131.170.250.223/login');
  });

  it('can login with invalid credentials', () => {
    cy.get('#\\:r0\\:').type('admin');
    cy.get('#\\:r1\\:').type('admin');
    cy.get(':nth-child(3) > .MuiButton-root').click();
    cy.get('#\\:r0\\:').should('have.value', 'admin');
    cy.get('#\\:r1\\:').should('have.value', 'admin');
  });

  it('can login with valid credentials', () => {
    cy.get('#\\:r0\\:').type('c');
    cy.get('#\\:r1\\:').type('#RMIT1234#');
    cy.get(':nth-child(3) > .MuiButton-root').click();
    cy.get('#\\:r0\\:').should('have.value', 'c');
    cy.get('#\\:r1\\:').should('have.value', '#RMIT1234#');
  });
});

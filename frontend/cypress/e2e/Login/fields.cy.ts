describe('Loads Login page', () => {
  beforeEach(() => {
    cy.visit('http://131.170.250.223/login');
  });

  it('displays the username field', () => {
    cy.get('#\\:r0\\:').should('be.visible');
  });

  it('displays the password field', () => {
    cy.get('#\\:r1\\:').should('be.visible');
  });
});

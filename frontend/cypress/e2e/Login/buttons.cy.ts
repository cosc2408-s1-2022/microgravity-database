describe('Loads Login page', () => {
  beforeEach(() => {
    cy.visit('http://131.170.250.223/login');
  });

  it('displays the Australian Space database logo', () => {
    cy.get('#navbar-logo').should('be.visible');
  });

  it('displays the login form button', () => {
    cy.get(':nth-child(3) > .MuiButton-root').should('be.visible');
  });

  it('displays the do not have account button', () => {
    cy.get(':nth-child(4) > .MuiTypography-root').should('be.visible');
  });
});

describe('Load the register page', () => {
  beforeEach(() => {
    cy.visit('http://131.170.250.223/register');
  });

  it('displasy the register button', () => {
    cy.get(':nth-child(10) > .MuiButton-root').should('be.visible');
  });

  it('displays the already have an account button', () => {
    cy.get(':nth-child(11) > .MuiTypography-root').should('be.visible');
  });

  it('displays the register as a researcher button', () => {
    cy.get(':nth-child(11) > .MuiTypography-root').should('be.visible');
  });
});

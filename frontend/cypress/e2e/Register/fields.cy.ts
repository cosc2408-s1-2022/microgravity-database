describe('Load the register page', () => {
  beforeEach(() => {
    cy.visit('http://131.170.250.223/register');
  });

  it('displays the first name field', () => {
    cy.get('#\\:r0\\:').should('be.visible');
  });

  it('displays the family name field', () => {
    cy.get('#\\:r1\\:').should('be.visible');
  });

  it('displays the username field', () => {
    cy.get('#\\:r2\\:').should('be.visible');
  });

  it('displays the affiliation field', () => {
    cy.get('#\\:r3\\:').should('be.visible');
  });

  it('displays the city', () => {
    cy.get('#\\:r4\\:').should('be.visible');
  });

  it('displays the state', () => {
    cy.get('#\\:r5\\:').should('be.visible');
  });

  it('displays the country', () => {
    cy.get('#\\:r6\\:').should('be.visible');
  });

  it('displays the password field', () => {
    cy.get('#\\:r7\\:').should('be.visible');
  });

  it('displays the confirm password field', () => {
    cy.get('#\\:r8\\:').should('be.visible');
  });
});

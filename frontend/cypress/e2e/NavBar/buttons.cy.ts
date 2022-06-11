describe('Loads Home Page', () => {
  beforeEach(() => {
    cy.visit('http://131.170.250.223/home');
  });

  it('displays the Australian Space database logo', () => {
    cy.get('#navbar-logo').should('be.visible');
  });

  it('displays the search icon', () => {
    cy.get('[href="/search/advanced?resultType=mission"]').should('be.visible');
  });

  it('displays the login icon', () => {
    cy.get('[href="/login"]').should('be.visible');
  });

  it('displays the register icon', () => {
    cy.get('[href="/register"]').should('be.visible');
  });

  it('Australian Space database logo links to home page', () => {
    cy.get('#navbar-logo').click();
    cy.url().should('include', '/home');
  });

  it('Login icon links to login page', () => {
    cy.get('[href="/login"]').click();
    cy.url().should('include', '/login');
  });

  it('Register icon links to register page', () => {
    cy.get('[href="/register"]').click();
    cy.url().should('include', '/register');
  });
});

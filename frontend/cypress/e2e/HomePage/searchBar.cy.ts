describe('Loads Home Page', () => {
  beforeEach(() => {
    cy.visit('http://131.170.250.223/home');
  });

  it('Clicks on search bar', () => {
    cy.get('#search').should('have.value', '');
  });

  it('types in search bar "test', () => {
    cy.get('#search').type('test');
  });

  it('text within search bar', () => {
    cy.get('#search').type('test');
    cy.get('#search').should('have.value', 'test');
  });

  it('button works and page loads with required data fields', () => {
    cy.get('#search').type('test');
    cy.get('.css-dc7zdy > .MuiBox-root > .MuiButton-root').click();
  });
});

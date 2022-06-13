describe('Loads Add Mission page', () => {
  beforeEach(() => {
    cy.visit('http://131.170.250.223/login');
    cy.get('#\\:r0\\:').type('c');
    cy.get('#\\:r1\\:').type('#RMIT1234#');
    cy.get(':nth-child(3) > .MuiButton-root').click();
    cy.get('#\\:r0\\:').should('have.value', 'c');
    cy.get('#\\:r1\\:').should('have.value', '#RMIT1234#');
  });
  it('displays first name field', () => {
    cy.get('[data-testid="AddRoundedIcon"]').click();
    cy.get('.MuiList-root > :nth-child(3)').click();
    cy.get('#\\:r3\\:').should('have.value', '');
  });

  it('displays family name field', () => {
    cy.get('[data-testid="AddRoundedIcon"]').click();
    cy.get('.MuiList-root > :nth-child(3)').click();
    cy.get('#\\:r4\\:').should('have.value', '');
  });

  it('displays the affiliation field', () => {
    cy.get('[data-testid="AddRoundedIcon"]').click();
    cy.get('.MuiList-root > :nth-child(3)').click();
    cy.get('#\\:r5\\:').should('have.value', '');
  });

  it('displays the city field', () => {
    cy.get('[data-testid="AddRoundedIcon"]').click();
    cy.get('.MuiList-root > :nth-child(3)').click();
    cy.get('#\\:r6\\:').should('have.value', '');
  });

  it('displays the state field', () => {
    cy.get('[data-testid="AddRoundedIcon"]').click();
    cy.get('.MuiList-root > :nth-child(3)').click();
    cy.get('#\\:r7\\:').should('have.value', '');
  });

  it('displays the country field', () => {
    cy.get('[data-testid="AddRoundedIcon"]').click();
    cy.get('.MuiList-root > :nth-child(3)').click();
    cy.get('#\\:r8\\:').should('have.value', '');
  });

  it('displays the email field', () => {
    cy.get('[data-testid="AddRoundedIcon"]').click();
    cy.get('.MuiList-root > :nth-child(3)').click();
    cy.get('#\\:r9\\:').should('have.value', '');
  });

  it('displays the phone field', () => {
    cy.get('[data-testid="AddRoundedIcon"]').click();
    cy.get('.MuiList-root > :nth-child(3)').click();
    cy.get('.form-control').should('have.value', '');
  });
});

describe('Load the register page', () => {
  beforeEach(() => {
    cy.visit('http://131.170.250.223/register');
  });

  it('can register as a researcher with incorrect password', () => {
    cy.get('#\\:r0\\:').type('a');
    cy.get('#\\:r1\\:').type('b');
    cy.get('#\\:r2\\:').type('c');
    cy.get('#\\:r3\\:').type('d');
    cy.get('#\\:r4\\:').type('e');
    cy.get('#\\:r5\\:').type('f');
    cy.get('#\\:r6\\:').type('g');
    cy.get('#\\:r7\\:').type('h');
    cy.get('#\\:r8\\:').type('i');
    cy.get(':nth-child(10) > .MuiButton-root').click();
  });

  it('can register as a researcher with correct password', () => {
    cy.get('#\\:r0\\:').type('a');
    cy.get('#\\:r1\\:').type('b');
    cy.get('#\\:r2\\:').type('c');
    cy.get('#\\:r3\\:').type('d');
    cy.get('#\\:r4\\:').type('e');
    cy.get('#\\:r5\\:').type('f');
    cy.get('#\\:r6\\:').type('g');
    cy.get('#\\:r7\\:').type('#RMIT1234#');
    cy.get('#\\:r8\\:').type('#RMIT1234#');
    cy.get(':nth-child(10) > .MuiButton-root').click();
  });
});

describe('Loads Home Page', () => {
  beforeEach(() => {
    cy.visit('http://131.170.250.223/home');
  });

  it('displays the space station icon', () => {
    cy.get(':nth-child(1) > .MuiTypography-inherit > .platform-logo').should('be.visible');
  });
  it('displays the text "Space"', () => {
    cy.get(':nth-child(1) > .MuiTypography-inherit > :nth-child(2)').contains('Space');
  });
  it('displays the text "Station"', () => {
    cy.get(':nth-child(1) > .MuiTypography-inherit > :nth-child(3)').contains('Station');
  });
});

describe('Displays the space shuttle components', () => {
  it('displays the space shuttle icon', () => {
    cy.get(':nth-child(2) > .MuiTypography-inherit > .platform-logo').should('be.visible');
  });
  it('displays the text "Space"', () => {
    cy.get(':nth-child(2) > .MuiTypography-inherit > :nth-child(2)').contains('Space');
  });
  it('displays the text "Shuttle"', () => {
    cy.get(':nth-child(2) > .MuiTypography-inherit > :nth-child(3)').contains('Shuttle');
  });
});

describe('Displays the Retrievable Capsule components', () => {
  it('displays the retrievable icon', () => {
    cy.get(':nth-child(3) > .MuiTypography-inherit > .platform-logo').should('be.visible');
  });
  it('displays the text "Retrievable"', () => {
    cy.get(':nth-child(3) > .MuiTypography-inherit > :nth-child(2)').contains('Retrievable');
  });
  it('displays the text "Capsule"', () => {
    cy.get(':nth-child(3) > .MuiTypography-inherit > :nth-child(3)').contains('Capsule');
  });
});

describe('Displays the Sounding Rocket components', () => {
  it('displays the sounding rocket icon', () => {
    cy.get(':nth-child(4) > .MuiTypography-inherit > .platform-logo').should('be.visible');
  });
  it('displays the text "Sounding"', () => {
    cy.get(':nth-child(4) > .MuiTypography-inherit > :nth-child(2)').contains('Sounding');
  });
  it('displays the text "Rocket"', () => {
    cy.get(':nth-child(4) > .MuiTypography-inherit > :nth-child(3)').contains('Rocket');
  });
});

describe('Displays the Parabolic flight components', () => {
  it('displays the parabolic flight icon', () => {
    cy.get(':nth-child(5) > .MuiTypography-inherit > .platform-logo').should('be.visible');
  });
  it('displays the text "Parabolic"', () => {
    cy.get(':nth-child(5) > .MuiTypography-inherit > :nth-child(2)').contains('Parabolic');
  });
  it('displays the text "Flight"', () => {
    cy.get(':nth-child(5) > .MuiTypography-inherit > :nth-child(3)').contains('Flight');
  });
});

describe('Displays the Ground based facilities components', () => {
  it('displays the ground based Facility icon', () => {
    cy.get(':nth-child(6) > .MuiTypography-inherit > .platform-logo').should('be.visible');
  });
  it('displays the text "Ground"', () => {
    cy.get(':nth-child(6) > .MuiTypography-inherit > :nth-child(2)').contains('Ground');
  });
  it('displays the text "Based"', () => {
    cy.get(':nth-child(6) > .MuiTypography-inherit > :nth-child(3)').contains('Based');
  });
  it('displays the text "Facility"', () => {
    cy.get(':nth-child(6) > .MuiTypography-inherit > :nth-child(4)').contains('Facility');
  });
});

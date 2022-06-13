describe('Loads AddExperiment page', () => {
  beforeEach(() => {
    cy.visit('http://131.170.250.223/login');
    cy.get('#\\:r0\\:').type('c');
    cy.get('#\\:r1\\:').type('#RMIT1234#');
    cy.get(':nth-child(3) > .MuiButton-root').click();
    cy.get('#\\:r0\\:').should('have.value', 'c');
    cy.get('#\\:r1\\:').should('have.value', '#RMIT1234#');
  });

  it('can load title filed', () => {
    cy.get('[data-testid="AddRoundedIcon"]').click();
    cy.get('.MuiList-root > [tabindex="0"]').click();
    cy.get('#\\:r3\\:').should('have.value', '');
  });

  it('can load lead institution field', () => {
    cy.get('[data-testid="AddRoundedIcon"]').click();
    cy.get('.MuiList-root > [tabindex="0"]').click();
    cy.get('#\\:r4\\:').should('have.value', '');
  });

  it('can load missions field', () => {
    cy.get('[data-testid="AddRoundedIcon"]').click();
    cy.get('.MuiList-root > [tabindex="0"]').click();
    cy.get('#\\:r5\\:')
      .type('RMIT Parabolic Flight 1 (2022)')
      .type('{downArrow}{enter}')
      .should('have.value', 'RMIT Parabolic Flight 1 (2022)');
  });

  it('can load experiment objectives field', () => {
    cy.get('[data-testid="AddRoundedIcon"]').click();
    cy.get('.MuiList-root > [tabindex="0"]').click();
    cy.get('#\\:r7\\:').should('have.value', '');
  });

  it('can load activity field', () => {
    cy.get('[data-testid="AddRoundedIcon"]').click();
    cy.get('.MuiList-root > [tabindex="0"]').click();
    cy.get('#\\:r8\\:').type('Scientific Research{downArrow}{enter}').should('have.value', 'Scientific Research');
    cy.get('#\\:re\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:re\\:').type('Industry{downArrow}{enter}').should('have.value', 'Industry');
    cy.get('#\\:re\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:re\\:').type('Human Spaceflight{downArrow}{enter}').should('have.value', 'Human Spaceflight');
  });

  it('can load ToA field', () => {
    cy.get('[data-testid="AddRoundedIcon"]').click();
    cy.get('.MuiList-root > [tabindex="0"]').click();
    cy.get('#\\:r8\\:').type('Scientific Research{downArrow}{enter}').should('have.value', 'Scientific Research');
    cy.get('#\\:ra\\:').type('Pure Basic Research{downArrow}{enter}').should('have.value', 'Pure Basic Research');
    cy.get('#\\:ra\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:ra\\:')
      .type('Strategic Basic Research{downArrow}{enter}')
      .should('have.value', 'Strategic Basic Research');
    cy.get('#\\:ra\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:ra\\:').type('Applied Research{downArrow}{enter}').should('have.value', 'Applied Research');
    cy.get('#\\:ra\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:ra\\:')
      .type('Experimental prodelopment{downArrow}{enter}')
      .should('have.value', 'Experimental prodelopment');
  });

  it('can load FoR field', () => {
    cy.get('[data-testid="AddRoundedIcon"]').click();
    cy.get('.MuiList-root > [tabindex="0"]').click();
    cy.get('#\\:r8\\:').type('Scientific Research{downArrow}{enter}').should('have.value', 'Scientific Research');
    cy.get('#\\:rc\\:')
      .type('300101{downArrow}{enter}', { delay: 400 })
      .should('have.value', '300101 Agricultural Biotechnology Diagnostics (Incl. Biosensors)');
    cy.get('#\\:rc\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:rc\\:').type('320604{downArrow}{enter}').should('have.value', '320604 Nanomedicine');
    cy.get('#\\:rc\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:rc\\:')
      .type('320603{downArrow}{enter}')
      .should('have.value', '320603 Medical Molecular Engineering Of Nucleic Acids And Proteins');
    cy.get('#\\:rc\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:rc\\:')
      .type('320602{downArrow}{enter}')
      .should('have.value', '320602 Medical Biotechnology Diagnostics (Incl. Biosensors)');
    cy.get('#\\:rc\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:rc\\:').type('320601{downArrow}{enter}').should('have.value', '320601 Gene And Molecular Therapy');
    cy.get('#\\:rc\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:rc\\:')
      .type('320599{downArrow}{enter}')
      .should('have.value', '320599 Medical Biochemistry And Metabolomics Not Elsewhere Classified');
    cy.get('#\\:rc\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:rc\\:').type('320507{downArrow}{enter}').should('have.value', '320507 Metabolic Medicine');
    cy.get('#\\:rc\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:rc\\:')
      .type('320506{downArrow}{enter}')
      .should('have.value', '320506 Medical Biochemistry - Proteins And Peptides (Incl. Medical Proteomics)');
    cy.get('#\\:rc\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:rc\\:')
      .type('320505{downArrow}{enter}')
      .should('have.value', '320505 Medical Biochemistry - Nucleic Acids');
    cy.get('#\\:rc\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:rc\\:').type('320504{downArrow}{enter}').should('have.value', '320504 Medical Biochemistry - Lipids');
    cy.get('#\\:rc\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:rc\\:')
      .type('320503{downArrow}{enter}')
      .should('have.value', '320503 Medical Biochemistry - Inorganic Elements And Compounds');
    cy.get('#\\:rc\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:rc\\:')
      .type('320502{downArrow}{enter}')
      .should('have.value', '320502 Medical Biochemistry - Carbohydrates');
    cy.get('#\\:rc\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:rc\\:')
      .type('320501{downArrow}{enter}')
      .should('have.value', '320501 Medical Biochemistry - Amino Acids And Metabolites');
    cy.get('#\\:rc\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:rc\\:')
      .type('320499{downArrow}{enter}')
      .should('have.value', '320499 Immunology Not Elsewhere Classified');
    cy.get('#\\:rc\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:rc\\:').type('320409{downArrow}{enter}').should('have.value', '320409 Tumour Immunology');
    cy.get('#\\:rc\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:rc\\:').type('320408{downArrow}{enter}').should('have.value', '320408 Transplantation Immunology');
    cy.get('#\\:rc\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:rc\\:').type('320407{downArrow}{enter}').should('have.value', '320407 Innate Immunity');
    cy.get('#\\:rc\\:').type('{selectAll}').type('{del}');
  });

  it('can load SeO field', () => {
    cy.get('[data-testid="AddRoundedIcon"]').click();
    cy.get('.MuiList-root > [tabindex="0"]').click();
    cy.get('#\\:r8\\:').type('Scientific Research{downArrow}{enter}').should('have.value', 'Scientific Research');
    cy.get('#\\:re\\:')
      .click()
      .type('280123{downArrow}{enter}', { delay: 200 })
      .should('have.value', '280123 Expanding Knowledge In Human Society');
    cy.get('#\\:re\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:re\\:')
      .type('280122{downArrow}{enter}')
      .should('have.value', '280122 Expanding Knowledge In Creative Arts And Writing Studies');
    cy.get('#\\:re\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:re\\:')
      .type('280121{downArrow}{enter}')
      .should('have.value', '280121 Expanding Knowledge In Psychology');
    cy.get('#\\:re\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:re\\:')
      .type('280120{downArrow}{enter}')
      .should('have.value', '280120 Expanding Knowledge In The Physical Sciences');
    cy.get('#\\:re\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:re\\:')
      .type('280119{downArrow}{enter}')
      .should('have.value', '280119 Expanding Knowledge In Philosophy And Religious Studies');
    cy.get('#\\:re\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:re\\:')
      .type('280118{downArrow}{enter}')
      .should('have.value', '280118 Expanding Knowledge In The Mathematical Sciences');
    cy.get('#\\:re\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:re\\:')
      .type('280117{downArrow}{enter}')
      .should('have.value', '280117 Expanding Knowledge In Law And Legal Studies');
    cy.get('#\\:re\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:re\\:')
      .type('280116{downArrow}{enter}')
      .should('have.value', '280116 Expanding Knowledge In Language, Communication And Culture');
    cy.get('#\\:re\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:re\\:')
      .type('280115{downArrow}{enter}')
      .should('have.value', '280115 Expanding Knowledge In The Information And Computing Sciences');
    cy.get('#\\:re\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:re\\:')
      .type('280114{downArrow}{enter}')
      .should('have.value', '280114 Expanding Knowledge In Indigenous Studies');
    cy.get('#\\:re\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:re\\:')
      .type('280113{downArrow}{enter}')
      .should('have.value', '280113 Expanding Knowledge In History, Heritage And Archaeology');
    cy.get('#\\:re\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:re\\:')
      .type('280112{downArrow}{enter}')
      .should('have.value', '280112 Expanding Knowledge In The Health Sciences');
    cy.get('#\\:re\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:re\\:')
      .type('280111{downArrow}{enter}')
      .should('have.value', '280111 Expanding Knowledge In The Environmental Sciences');
    cy.get('#\\:re\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:re\\:')
      .type('280110{downArrow}{enter}')
      .should('have.value', '280110 Expanding Knowledge In Engineering');
    cy.get('#\\:re\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:re\\:')
      .type('280109{downArrow}{enter}')
      .should('have.value', '280109 Expanding Knowledge In Education');
    cy.get('#\\:re\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:re\\:')
      .type('280108{downArrow}{enter}')
      .should('have.value', '280108 Expanding Knowledge In Economics');
    cy.get('#\\:re\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:re\\:')
      .type('280107{downArrow}{enter}')
      .should('have.value', '280107 Expanding Knowledge In The Earth Sciences');
    cy.get('#\\:re\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:re\\:')
      .type('280106{downArrow}{enter}')
      .should('have.value', '280106 Expanding Knowledge In Commerce, Management, Tourism And Services');
    cy.get('#\\:re\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:re\\:')
      .type('280105{downArrow}{enter}')
      .should('have.value', '280105 Expanding Knowledge In The Chemical Sciences');
    cy.get('#\\:re\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:re\\:')
      .type('280104{downArrow}{enter}')
      .should('have.value', '280104 Expanding Knowledge In Built Environment And Design');
    cy.get('#\\:re\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:re\\:')
      .type('280103{downArrow}{enter}')
      .should('have.value', '280103 Expanding Knowledge In The Biomedical And Clinical Sciences');
    cy.get('#\\:re\\:').type('{selectAll}').type('{del}');
    cy.get('#\\:re\\:')
      .type('280102{downArrow}{enter}')
      .should('have.value', '280102 Expanding Knowledge In The Biological Sciences');
  });
});

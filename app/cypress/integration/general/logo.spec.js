describe('logo is visitable and clickable', () => {
  it('logo in homepage', () => {
    cy.gotoHome();
    cy.getReact('HeaderBar')
      .get('#logo')
      .should('be.visible')
      .should('have.attr', 'alt', 'logo');
  });

  it('logo in product page', () => {
    cy.gotoSampleProduct();
    // visible
    cy.getReact('HeaderBar')
      .get('#logo')
      .should('be.visible')
      .should('have.attr', 'alt', 'logo');
    // navigate to home after click
    cy.getReact('HeaderBar').get('#logo').click();
    cy.location('pathname').should('match', /\//);
  });

  it('logo in category page', () => {
    cy.gotoSampleCategory();
    // visible
    cy.getReact('HeaderBar')
      .get('#logo')
      .should('be.visible')
      .should('have.attr', 'alt', 'logo');
    // navigate to home after click
    cy.getReact('HeaderBar').get('#logo').click();
    cy.location('pathname').should('match', /\//);
  });

  it('logo in search page', () => {
    cy.gotoSampleSearch();
    // visible
    cy.getReact('HeaderBar')
      .get('#logo')
      .should('be.visible')
      .should('have.attr', 'alt', 'logo');
    // navigate to home after click
    cy.getReact('HeaderBar').get('#logo').click();
    cy.location('pathname').should('match', /\//);
  });

  it('logo in cart page', () => {
    cy.gotoCart();
    // visible
    cy.getReact('HeaderBar')
      .get('#logo')
      .should('be.visible')
      .should('have.attr', 'alt', 'logo');
    // navigate to home after click
    cy.getReact('HeaderBar').get('#logo').click();
    cy.location('pathname').should('match', /\//);
  });

  it('logo in checkout page', () => {
    cy.gotoSampleCheckout();
    // visible
    cy.getReact('HeaderBar')
      .get('#logo')
      .should('be.visible')
      .should('have.attr', 'alt', 'logo');
    // navigate to home after click
    cy.getReact('HeaderBar').get('#logo').click();
    cy.location('pathname').should('match', /\//);
  });
});

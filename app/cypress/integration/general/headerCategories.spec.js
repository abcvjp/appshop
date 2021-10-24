import { SAMPLE_CATEGORY_ID, SAMPLE_CATEGORY_NAME } from '../../constants';

describe('header category list', () => {
  it('header category list in home page', () => {
    cy.gotoHome();
    cy.getReact('HeaderCategory').should('have.length.at.least', 1);
    cy.react('HeaderCategories')
      .find('a')
      .each((categoryLink) => {
        // hover over category
        cy.wrap(categoryLink).trigger('mouseover').trigger('mouseout');
        // click the link
        cy.wrap(categoryLink).click();
        // verify the link
        cy.location('href').should('eq', categoryLink.prop('href'));
        cy.go('back');
      });
  });

  it('header category list in product page', () => {
    cy.gotoSampleProduct();
    cy.getReact('HeaderCategory').should('have.length.at.least', 1);
    cy.react('HeaderCategories')
      .find('a')
      .each((categoryLink) => {
        // hover over category
        cy.wrap(categoryLink).trigger('mouseover').trigger('mouseout');
        // click the link
        cy.wrap(categoryLink).click();
        // verify the link
        cy.location('href').should('eq', categoryLink.prop('href'));
        cy.go('back');
      });
  });

  it('header category list in category page', () => {
    cy.gotoSampleCategory();
    cy.getReact('HeaderCategory').should('have.length.at.least', 1);
    cy.react('HeaderCategories')
      .find('a')
      .each((categoryLink) => {
        // hover over category
        cy.wrap(categoryLink).trigger('mouseover').trigger('mouseout');
        // click the link
        cy.wrap(categoryLink).click();
        // verify the link
        cy.location('href').should('eq', categoryLink.prop('href'));
        cy.go('back');
      });
  });

  it('header category list in search page', () => {
    cy.gotoSampleSearch();
    cy.getReact('HeaderCategory').should('have.length.at.least', 1);
    cy.react('HeaderCategories')
      .find('a')
      .each((categoryLink) => {
        // hover over category
        cy.wrap(categoryLink).trigger('mouseover').trigger('mouseout');
        // click the link
        cy.wrap(categoryLink).click();
        // verify the link
        cy.location('href').should('eq', categoryLink.prop('href'));
        cy.go('back');
      });
  });

  it('header category list in cart page', () => {
    cy.gotoCart();
    cy.getReact('HeaderCategory').should('have.length.at.least', 1);
    cy.react('HeaderCategories')
      .find('a')
      .each((categoryLink) => {
        // hover over category
        cy.wrap(categoryLink).trigger('mouseover').trigger('mouseout');
        // click the link
        cy.wrap(categoryLink).click();
        // verify the link
        cy.location('href').should('eq', categoryLink.prop('href'));
        cy.go('back');
      });
  });

  it('header category list in checkout page', () => {
    cy.gotoSampleCheckout();
    cy.getReact('HeaderCategory').should('have.length.at.least', 1);
    cy.react('HeaderCategories')
      .find('a')
      .each((categoryLink) => {
        // hover over category
        cy.wrap(categoryLink).trigger('mouseover').trigger('mouseout');
        // click the link
        cy.wrap(categoryLink).click();
        // verify the link
        cy.location('href').should('eq', categoryLink.prop('href'));
        cy.go('back');
      });
  });
});

const validKeyword = 'ao so mi dai tay';
const invalidKeyword = 'abc';

describe('search bar is working', () => {
  describe('search in homepage', () => {
    beforeEach(() => {
      cy.gotoHome();
    });
    it('can type into search bar', () => {
      cy.react('SearchBar').get('input').invoke('val').should('eq', '');
      cy.react('SearchBar').type(validKeyword);
      cy.react('SearchBar')
        .get('input')
        .invoke('val')
        .should('eq', validKeyword);
    });
    it('searh with valid keyword', () => {
      cy.react('SearchBar').type(`${validKeyword}{enter}`);
      cy.title(`Search for "${validKeyword}" | Webshop`);
      cy.contains(`Search for "${validKeyword}"`);
      cy.react('SearchBar').get('input').invoke('val').should('eq', '');
    });
    it('search with invalid keyword', () => {
      cy.react('SearchBar').type(`${invalidKeyword}{enter}`);
      cy.url().should('eq', Cypress.config().baseUrl);
      cy.react('SearchBar')
        .get('input')
        .invoke('val')
        .should('eq', invalidKeyword);
    });
    it('search with nothing', () => {
      cy.react('SearchBar').type('{enter}');
      cy.url().should('eq', Cypress.config().baseUrl);
      cy.react('SearchBar').get('input').invoke('val').should('eq', '');
    });
  });

  describe('search in product page', () => {
    beforeEach(() => {
      cy.gotoSampleProduct();
    });
    it('can type into search bar', () => {
      cy.react('SearchBar').get('input').invoke('val').should('eq', '');
      cy.react('SearchBar').type(validKeyword);
      cy.react('SearchBar')
        .get('input')
        .invoke('val')
        .should('eq', validKeyword);
    });
    it('searh with valid keyword', () => {
      cy.react('SearchBar').type(`${validKeyword}{enter}`);
      cy.title(`Search for "${validKeyword}" | Webshop`);
      cy.contains(`Search for "${validKeyword}"`);
      cy.react('SearchBar').get('input').invoke('val').should('eq', '');
    });
    it('search with invalid keyword', () => {
      cy.react('SearchBar').type(`${invalidKeyword}{enter}`);
      cy.url().should('eq', Cypress.config().baseUrl);
      cy.react('SearchBar')
        .get('input')
        .invoke('val')
        .should('eq', invalidKeyword);
    });
    it('search with nothing', () => {
      cy.react('SearchBar').type('{enter}');
      cy.url().should('eq', Cypress.config().baseUrl);
      cy.react('SearchBar').get('input').invoke('val').should('eq', '');
    });
  });

  describe('search in category page', () => {
    beforeEach(() => {
      cy.gotoSampleCategory();
    });
    it('can type into search bar', () => {
      cy.react('SearchBar').get('input').invoke('val').should('eq', '');
      cy.react('SearchBar').type(validKeyword);
      cy.react('SearchBar')
        .get('input')
        .invoke('val')
        .should('eq', validKeyword);
    });
    it('searh with valid keyword', () => {
      cy.react('SearchBar').type(`${validKeyword}{enter}`);
      cy.title(`Search for "${validKeyword}" | Webshop`);
      cy.contains(`Search for "${validKeyword}"`);
      cy.react('SearchBar').get('input').invoke('val').should('eq', '');
    });
    it('search with invalid keyword', () => {
      cy.react('SearchBar').type(`${invalidKeyword}{enter}`);
      cy.url().should('eq', Cypress.config().baseUrl);
      cy.react('SearchBar')
        .get('input')
        .invoke('val')
        .should('eq', invalidKeyword);
    });
    it('search with nothing', () => {
      cy.react('SearchBar').type('{enter}');
      cy.url().should('eq', Cypress.config().baseUrl);
      cy.react('SearchBar').get('input').invoke('val').should('eq', '');
    });
  });

  describe('search in search page', () => {
    beforeEach(() => {
      cy.gotoSampleSearch();
    });
    it('can type into search bar', () => {
      cy.react('SearchBar').get('input').invoke('val').should('eq', '');
      cy.react('SearchBar').type(validKeyword);
      cy.react('SearchBar')
        .get('input')
        .invoke('val')
        .should('eq', validKeyword);
    });
    it('searh with valid keyword', () => {
      cy.react('SearchBar').type(`${validKeyword}{enter}`);
      cy.title(`Search for "${validKeyword}" | Webshop`);
      cy.contains(`Search for "${validKeyword}"`);
      cy.react('SearchBar').get('input').invoke('val').should('eq', '');
    });
    it('search with invalid keyword', () => {
      cy.react('SearchBar').type(`${invalidKeyword}{enter}`);
      cy.url().should('eq', Cypress.config().baseUrl);
      cy.react('SearchBar')
        .get('input')
        .invoke('val')
        .should('eq', invalidKeyword);
    });
    it('search with nothing', () => {
      cy.react('SearchBar').type('{enter}');
      cy.url().should('eq', Cypress.config().baseUrl);
      cy.react('SearchBar').get('input').invoke('val').should('eq', '');
    });
  });

  describe('search in cart page', () => {
    beforeEach(() => {
      cy.gotoCart();
    });
    it('can type into search bar', () => {
      cy.react('SearchBar').get('input').invoke('val').should('eq', '');
      cy.react('SearchBar').type(validKeyword);
      cy.react('SearchBar')
        .get('input')
        .invoke('val')
        .should('eq', validKeyword);
    });
    it('searh with valid keyword', () => {
      cy.react('SearchBar').type(`${validKeyword}{enter}`);
      cy.title(`Search for "${validKeyword}" | Webshop`);
      cy.contains(`Search for "${validKeyword}"`);
      cy.react('SearchBar').get('input').invoke('val').should('eq', '');
    });
    it('search with invalid keyword', () => {
      cy.react('SearchBar').type(`${invalidKeyword}{enter}`);
      cy.url().should('eq', Cypress.config().baseUrl);
      cy.react('SearchBar')
        .get('input')
        .invoke('val')
        .should('eq', invalidKeyword);
    });
    it('search with nothing', () => {
      cy.react('SearchBar').type('{enter}');
      cy.url().should('eq', Cypress.config().baseUrl);
      cy.react('SearchBar').get('input').invoke('val').should('eq', '');
    });
  });

  describe('search in checkout page', () => {
    beforeEach(() => {
      cy.gotoSampleCheckout();
    });
    it('can type into search bar', () => {
      cy.react('SearchBar').get('input').invoke('val').should('eq', '');
      cy.react('SearchBar').type(validKeyword);
      cy.react('SearchBar')
        .get('input')
        .invoke('val')
        .should('eq', validKeyword);
    });
    it('searh with valid keyword', () => {
      cy.react('SearchBar').type(`${validKeyword}{enter}`);
      cy.title(`Search for "${validKeyword}" | Webshop`);
      cy.contains(`Search for "${validKeyword}"`);
      cy.react('SearchBar').get('input').invoke('val').should('eq', '');
    });
    it('search with invalid keyword', () => {
      cy.react('SearchBar').type(`${invalidKeyword}{enter}`);
      cy.url().should('eq', Cypress.config().baseUrl);
      cy.react('SearchBar')
        .get('input')
        .invoke('val')
        .should('eq', invalidKeyword);
    });
    it('search with nothing', () => {
      cy.react('SearchBar').type('{enter}');
      cy.url().should('eq', Cypress.config().baseUrl);
      cy.react('SearchBar').get('input').invoke('val').should('eq', '');
    });
  });
});

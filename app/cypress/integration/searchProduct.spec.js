// prepare data
const validKeyword = 'ao so mi dai tay';
const invalidKeyword = 'abc';
describe('search product from home page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForReact();
  });
  it('can type into search bar', () => {
    cy.react('SearchBar').get('input')
      .invoke('val').should('eq', '');
    cy.react('SearchBar').type(validKeyword);
    cy.react('SearchBar').get('input')
      .invoke('val').should('eq', validKeyword);
  });
  it('searh with valid keyword', () => {
    cy.react('SearchBar').type(`${validKeyword}{enter}`);
    cy.title(`Search for "${validKeyword}" | Webshop`);
    cy.contains(`Search for "${validKeyword}"`);
    cy.react('SearchBar').get('input')
      .invoke('val').should('eq', '');
  });
  it('search with invalid keyword', () => {
    cy.react('SearchBar').type(`${invalidKeyword}{enter}`);
    cy.url().should('eq', Cypress.config().baseUrl);
    cy.react('SearchBar').get('input')
      .invoke('val').should('eq', invalidKeyword);
  });
  it('search with nothing', () => {
    cy.react('SearchBar').type('{enter}');
    cy.url().should('eq', Cypress.config().baseUrl);
    cy.react('SearchBar').get('input')
      .invoke('val').should('eq', '');
  });
});

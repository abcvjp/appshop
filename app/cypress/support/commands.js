// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import {
  CART_PAGE_PATH,
  SAMPLE_CART_DATA,
  PRODUCT_SAMPLE_PAGE_PATH,
  CATEGORY_SAMPLE_PAGE_PATH,
  SEARCH_SAMPLE_PAGE_PATH
} from '../constants';

Cypress.Commands.add('gotoSampleCheckout', () => {
  cy.visit(CART_PAGE_PATH, {
    onBeforeLoad: function (window) {
      window.localStorage.setItem('cart', SAMPLE_CART_DATA);
    }
  });
  cy.get('#checkout-button').click();
  cy.waitForReact();
});

Cypress.Commands.add('gotoHome', () => {
  cy.visit('/');
  cy.waitForReact();
});

Cypress.Commands.add('gotoSampleProduct', () => {
  cy.visit(PRODUCT_SAMPLE_PAGE_PATH);
  cy.waitForReact();
});

Cypress.Commands.add('gotoSampleCategory', () => {
  cy.visit(CATEGORY_SAMPLE_PAGE_PATH);
  cy.waitForReact();
});

Cypress.Commands.add('gotoSampleSearch', () => {
  cy.visit(SEARCH_SAMPLE_PAGE_PATH);
  cy.waitForReact();
});

Cypress.Commands.add('gotoCart', () => {
  cy.visit(CART_PAGE_PATH);
  cy.waitForReact();
});

Cypress.Commands.add('gotoHomeWithCart', () => {
  cy.visit('/', {
    onBeforeLoad: function (window) {
      window.localStorage.setItem('cart', SAMPLE_CART_DATA);
    }
  });
  cy.waitForReact();
});

Cypress.Commands.add('gotoSampleProductWithCart', () => {
  cy.visit(PRODUCT_SAMPLE_PAGE_PATH, {
    onBeforeLoad: function (window) {
      window.localStorage.setItem('cart', SAMPLE_CART_DATA);
    }
  });
  cy.waitForReact();
});

Cypress.Commands.add('gotoSampleCategoryWithCart', () => {
  cy.visit(CATEGORY_SAMPLE_PAGE_PATH, {
    onBeforeLoad: function (window) {
      window.localStorage.setItem('cart', SAMPLE_CART_DATA);
    }
  });
  cy.waitForReact();
});

Cypress.Commands.add('gotoSampleSearchWithCart', () => {
  cy.visit(SEARCH_SAMPLE_PAGE_PATH, {
    onBeforeLoad: function (window) {
      window.localStorage.setItem('cart', SAMPLE_CART_DATA);
    }
  });
  cy.waitForReact();
});

Cypress.Commands.add('gotoCartWithCart', () => {
  cy.visit(CART_PAGE_PATH, {
    onBeforeLoad: function (window) {
      window.localStorage.setItem('cart', SAMPLE_CART_DATA);
    }
  });
  cy.waitForReact();
});
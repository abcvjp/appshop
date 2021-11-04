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

Cypress.Commands.add('gotoSampleProduct2', () => {
  cy.visit('/product/ao-so-mi-ar90780d2')
  cy.waitForReact()
})

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

Cypress.Commands.add('gotoSampleCart', () => {
  cy.visit('/cart', {
    onBeforeLoad: function (window) {
      window.localStorage.setItem('cart', SAMPLE_CART_DATA);
    }
  });
  cy.waitForReact();
})

Cypress.Commands.add('searchSampleProduct', () => {
  cy.visit('/')
  cy.waitForReact()
  cy.react('SearchBar').type('quan jean{enter}');
})

Cypress.Commands.add('typeSampleCheckoutInfo', () => {
  cy.react('TextField', { props: { name: "email" } })
    .type('aothatday@gmail.com')
  cy.react('TextField', { props: { name: "customer_name" } })
    .type('Vừ A Dính')
  cy.react('TextField', { props: { name: "phone_number" } })
    .type('0123456789')
  cy.react('TextField', { props: { name: "address" } })
    .type('Số 144 Xuân Thủy, quận Cầu Giấy, thành phố Hà Nội')
  cy.react('TextField', { props: { name: "shipping_note" } })
    .type('Shipper cẩn thận vì nhà có chó dữ')
})

Cypress.Commands.add('checkoutWithSampleInfo', () => {
  // type checkout info
  cy.typeSampleCheckoutInfo();
  // select shipping method
  cy.react('ShippingMethod')
    .find('[type="radio"]').first().check()
  // click next
  cy.react('ContainedButton')
    .eq(1)
    .click()
  // select payment method
  cy.react('ReviewAndPayment')
    .find('[type="radio"]').first().check()
  // click place order
  cy.react('ContainedButton')
    .eq(1)
    .click()
  // click confirm order
  cy.react('ConfirmDialog')
    .react('Button').eq(1).click()
})
import {
	SAMPLE_PRODUCT as sampleProduct,
	SAMPLLE_OUTOFSTOCK_PRODUCT as sampleSoldOutProduct,
	SAMPLE_DISABLED_PRODUCT as sampleDisabledProduct
} from '../../../constants';

describe('product page: buy now', () => {
	it('buy now button is visible', () => {
		cy.gotoSampleProduct()
		cy.get('div#select-area')
			.react('Button')
			.eq(1)
			.should('be.visible')
	})

	it('buy now valid product', () => {
		// visit product page
		cy.gotoSampleProduct()
		// click buy now
		cy.get('div#select-area')
			.react('Button')
			.eq(1)
			.click()
		// should navigate to checkout page
		cy.location('pathname')
			.should('eq', '/checkout')
		// click to see order item
		cy.react('OrderSummary')
			.get('div#order-item-list')
			.react('ListItem')
			.click()
		// should contain product to bought
		cy.react('OrderSummary')
			.get('div#order-item-list')
			.react('ListItem').should('contain', sampleProduct.name)
	})

	it('add sold out product', () => {
		// visit product page
		cy.visit('/product/' + sampleSoldOutProduct.slug);
		cy.waitForReact()
		// click buy now
		cy.get('div#select-area')
			.react('Button')
			.eq(1)
			.click()
		// should print alert message
			cy.react('Alert')
				.should('contain', 'This product has sold out')
			// mini cart should not have item
			cy.react('MiniCart')
					.getReact('IconButton')
					.getReact('Badge')
					.getProps('badgeContent')
					// item count
					.should('eq', 0);
			cy.react('MiniCart').trigger('mouseover')
				.should('not.contain', sampleProduct.name)
	})

	it('add disabled product', () => {
		// visit product page
		cy.visit('/product/' + sampleDisabledProduct.slug);
		cy.waitForReact()
		// click buy now
		cy.get('div#select-area')
			.react('Button')
			.eq(1)
			.click()
		// should print alert message
		cy.react('Alert')
			.should('contain', 'This product has been disabled')
		// mini cart should not have item
		cy.react('MiniCart')
				.getReact('IconButton')
				.getReact('Badge')
				.getProps('badgeContent')
				// item count
				.should('eq', 0);
		cy.react('MiniCart').trigger('mouseover')
			.should('not.contain', sampleProduct.name)
	})
})
import {
	SAMPLE_PRODUCT as sampleProduct,
	SAMPLLE_OUTOFSTOCK_PRODUCT as sampleSoldOutProduct,
	SAMPLE_DISABLED_PRODUCT as sampleDisabledProduct
} from '../../../constants';

describe('product page: add to cart', () => {
	it('add to cart button is visible', () => {
		cy.gotoSampleProduct()
		cy.get('div#select-area')
			.react('Button')
			.eq(0)
			.should('be.visible')
	})

	it('add to cart with quantity input empty', () => {
		// visit product page
		cy.gotoSampleProduct()
		// clear the quantity input
		cy.get('div#select-area')
			.react('QuantitySelector')
			.react('InputBase')
			.find('input')
			.clear()
		// click add to cart
		cy.get('div#select-area')
			.react('Button')
			.eq(0)
			.click()
		// should print alert message
		cy.react('Alert')
			.should('contain', 'Quantity is invalid')
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

	describe('add to cart with valid quantity', () => {
		it('add valid product', () => {
			// visit product page
			cy.gotoSampleProduct()
			// click add to cart
			cy.get('div#select-area')
				.react('Button')
				.eq(0)
				.click()
			// should print alert message
			cy.react('Alert')
				.should('contain', 'Added successfully')
			// mini cart should have item
			cy.react('MiniCart')
					.getReact('IconButton')
					.getReact('Badge')
					.getProps('badgeContent')
					// item count
					.should('eq', 1);
			cy.react('MiniCart').trigger('mouseover')
				.react('MiniCartDetail')
				.should('contain', sampleProduct.name)
		})

		it('add sold out product', () => {
			// visit product page
			cy.visit('/product/' + sampleSoldOutProduct.slug);
			cy.waitForReact()
			// click add to cart
			cy.get('div#select-area')
				.react('Button')
				.eq(0)
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
			// click add to cart
			cy.get('div#select-area')
				.react('Button')
				.eq(0)
				.click()
			// should print alert message
			cy.react('Alert')
				.should('contain', 'This product has been disabled')
			// mini cart should have item
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
})
import { CART_PAGE_PATH } from '../../constants';

describe('mini cart without item', () => {
	describe('mini cart without item: in home page', () => {
		before(() => {
			cy.gotoHome();
		})
		it('show nothing but empty message', () => {
			cy.react('MiniCart')
				.should('be.visible')
				.trigger('mouseover')
				.react('MiniCartDetail').should('not.exist')
			cy.react('MiniCart').react('Typography').should('contain', 'Your cart is current empty')
			cy.react('MiniCart').trigger('mouseout')
				.react('MiniCartDetail').should('not.exist')
		});
		it('navigate to cart page after click cart icon', () => {
			cy.react('MiniCart').react('IconButton').click();
			cy.location('pathname').should('eq', CART_PAGE_PATH);
		});
	});

	describe('mini cart without item: in product page', () => {
		before(() => {
			cy.gotoSampleProduct();
		})
		it('show nothing but empty message', () => {
			cy.react('MiniCart')
				.should('be.visible')
				.trigger('mouseover')
				.react('MiniCartDetail').should('not.exist')
			cy.react('MiniCart').react('Typography').should('contain', 'Your cart is current empty')
			cy.react('MiniCart').trigger('mouseout')
				.react('MiniCartDetail').should('not.exist')
		});
		it('navigate to cart page after click cart icon', () => {
			cy.react('MiniCart').react('IconButton').click();
			cy.location('pathname').should('eq', CART_PAGE_PATH);
		});
	});

	describe('mini cart without item: in category page', () => {
		before(() => {
			cy.gotoSampleCategory();
		})
		it('show nothing but empty message', () => {
			cy.react('MiniCart')
				.should('be.visible')
				.trigger('mouseover')
				.react('MiniCartDetail').should('not.exist')
			cy.react('MiniCart').react('Typography').should('contain', 'Your cart is current empty')
			cy.react('MiniCart').trigger('mouseout')
				.react('MiniCartDetail').should('not.exist')
		});
		it('navigate to cart page after click cart icon', () => {
			cy.react('MiniCart').react('IconButton').click();
			cy.location('pathname').should('eq', CART_PAGE_PATH);
		});
	});

	describe('mini cart without item: in search page', () => {
		before(() => {
			cy.gotoSampleSearch();
		})
		it('show nothing but empty message', () => {
			cy.react('MiniCart')
				.should('be.visible')
				.trigger('mouseover')
				.react('MiniCartDetail').should('not.exist')
			cy.react('MiniCart').react('Typography').should('contain', 'Your cart is current empty')
			cy.react('MiniCart').trigger('mouseout')
				.react('MiniCartDetail').should('not.exist')
		});
		it('navigate to cart page after click cart icon', () => {
			cy.react('MiniCart').react('IconButton').click();
			cy.location('pathname').should('eq', CART_PAGE_PATH);
		});
	});

	describe('mini cart without item: in cart page', () => {
		before(() => {
			cy.gotoCart();
		})
		it('show nothing but empty message', () => {
			cy.react('MiniCart')
				.should('be.visible')
				.trigger('mouseover')
				.react('MiniCartDetail').should('not.exist')
			cy.react('MiniCart').react('Typography').should('contain', 'Your cart is current empty')
			cy.react('MiniCart').trigger('mouseout')
				.react('MiniCartDetail').should('not.exist')
		});
		it('navigate to cart page after click cart icon', () => {
			cy.react('MiniCart').react('IconButton').click();
			cy.location('pathname').should('eq', CART_PAGE_PATH);
		});
	});
})
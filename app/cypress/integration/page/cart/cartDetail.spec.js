import { SAMPLE_CART_DATA, SAMPLE_CART_DATA_2 } from '../../../constants';

const sampleCart = JSON.parse(SAMPLE_CART_DATA)

describe('cart page: cart detail', () => {
	it('cart detail is not showed when cart is empty', () => {
		cy.gotoCart();
		cy.waitForReact();
		cy.react('CartDetail', { options: {timeout: 1500 }})
			.should('not.exist')
	})

	describe('cart detail when cart has item', () => {
		before(() => {
			cy.gotoSampleCart();
		})

		it('cart detail is visible', () => {
			cy.react('CartDetail')
				.should('be.visible')
		})

		it('cart detail should show correct items', () => {
			cy.react('CartDetail')
				.react('CartItem')
				.should('have.length', sampleCart.length)
			sampleCart.forEach((cartItem, i) => {
				cy.react('CartDetail')
					.react('CartItem')
					.eq(i)
					.should('contain.text', sampleCart[i].product_name)
				cy.getReact('CartDetail')
					.getReact('CartItem')
					.nthNode(i)
					.getProps('item')
					.should('deep.equal', sampleCart[i])
			})
		})

	})
})
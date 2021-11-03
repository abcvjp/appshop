describe('cart page: cart summary', () => {

	it('cart summary is not showed when cart is empty', () => {
		cy.gotoCart();
		cy.waitForReact();
		cy.react('CartSummary', { options: {timeout: 1500 }})
			.should('not.exist')
	})

	describe('cart summary when cart has item', () => {
		before(() => {
			cy.gotoSampleCart()
		})

		it('cart summary is visible', () => {
			cy.react('CartSummary')
				.should('be.visible')
		})

		it('show correct cart infomation', () => {
			cy.react('CartSummary')
				.should('contain.text', 'Subtotal')
				.should('contain.text', `$32.83`)
				.should('contain.text', 'Order Total')
				.should('contain.text', 'Discount')
		})

		it('checkout button is work', () => {
			cy.react('CartSummary')
				.find('button')
				.should('be.visible')
				.should('be.enabled')
		})
	})
})
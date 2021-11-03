describe('cart page: item selector', () => {
	before(() => {
		cy.gotoSampleCart()
	})

	it('item selector should be visible and selectable', () => {
		cy.react('CartDetail')
			.react('CartItem')
			.react('Checkbox')
			.should('be.visible')
	})
})
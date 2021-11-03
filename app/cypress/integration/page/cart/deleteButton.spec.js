describe('cart page: delete button', () => {
	beforeEach(() => {
		cy.gotoSampleCart()
	})

	it('delete a item button should visible and click work', () => {
		cy.react('CartDetail')	
			.react('CartItem')
			.react('IconButton')
			.should('be.visible')
			.eq(0)
			.click()
		cy.react('ConfirmDialog')
			.should('be.visible')
			.should('contain.text', 'Are you sure want to delete this item?')
	})

	it('delete all item button should visible and click work', () => {
		cy.react('CartDetail')	
			.react('IconButton')
			.should('be.visible')
			.eq(0)
			.click()
		cy.react('ConfirmDialog')
			.should('be.visible')
			.should('contain.text', 'Are you sure want to delete all items in your cart?')
	})
})
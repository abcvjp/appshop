describe('product page: product describe', () => {
	before(() => {
		cy.gotoSampleProduct()
	})
	it('product description should visible', () => {
		cy
			.get('div[id="product-description"]')
			.react('Tab', { props: { label: "Description" } })
			.should('be.visible')
	})
})
describe('page size selector', () => {
	beforeEach(() => {
		cy.gotoSampleCategory()
	})

	it('page size selector is visible', () => {
		cy.react('PageSizeSelector')
			.should('be.visible')
			.find('select')
			.should('be.visible')
	})

	it('page size selector contain specific page size', () => {
		cy.react('PageSizeSelector')
			.find('select')
			.should('contain', 8)
			.should('contain', 16)
			.should('contain', 24)
			.should('contain', 48)
	})

	it('have default value 8', () => {
		cy.react('PageSizeSelector')
			.find('select')
			.should('have.value', 8)
		// make sure product quantity in list is correct
		cy.getReact('ProductList')
			.getReact('Products')
			.getProps('products')
			.should('have.length', 8)
	})

	it('page size can change correctly', () => {
		cy.react('PageSizeSelector')
			.find('option')
			.each(option => {
				cy.wrap(option)
					.invoke('val')
					.then(val => {
						cy.react('PageSizeSelector')
							.find('select')
							.select(val)
						// wait for fetching result
						cy.wait(1500)
						// make sure product quantity in list is correct
						cy.getReact('ProductList')
							.getReact('Products')
							.getProps('products')
							.should('have.length', val)
					})
			})
	})
})
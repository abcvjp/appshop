describe('Category page: sort selector', () => {
	beforeEach(() => {
		cy.gotoSampleCategory()
	})

	it('sort selector is visible', () => {
		cy.react('SortSelector')
			.should('be.visible')
			.find('select')
			.should('be.visible')
			.contains('Newest')
	})

	it('sort selector contain select elements', () => {
		cy.react('SortSelector')
			.find('select')
			.should('contain', 'Newest')
			.should('contain', 'Oldest')
			.should('contain', 'Price (Low to High)')
			.should('contain', 'Price (High to Low)')
			.should('contain', 'Discount')
			.should('contain', 'Best Selling')
	})

	it('have default value "Newest"', () => {
		cy.react('SortSelector')
			.find('select')
			.should('have.value', 'createdAt.desc')
			.find('option:selected')
			.should('have.text', 'Newest')
		// make sure product list is selected correctly
		cy.getReact('ProductList')
			.getReact('Products')
			.getProps('products')
			.then(products => {
				cy.wrap(products).should('deep.equal',
					products.sort((a,b) => a.createdAt >= b.createdAt))
			})
	})

	it('sort by "Oldest"', () => {
		cy.react('SortSelector')
			.find('select')
			.select('createdAt.asc')
			.should('have.value', 'createdAt.asc')
			.find('option:selected')
			.should('have.text', 'Oldest')
		// wait for fetching result
		cy.wait(1500)
		// make sure product list is selected correctly
		cy.getReact('ProductList')
			.getReact('Products')
			.getProps('products')
			.then(products => {
				cy.wrap(products).should('deep.equal',
					products.sort((a,b) => a.createdAt <= b.createdAt))
			})
	})

	it('sort by "Price (Low to High)"', () => {
		cy.react('SortSelector')
			.find('select')
			.select('price.asc')
			.should('have.value', 'price.asc')
			.find('option:selected')
			.should('have.text', 'Price (Low to High)')
		// wait for fetching result
		cy.wait(1500)
		// make sure product list is selected correctly
		cy.getReact('ProductList')
			.getReact('Products')
			.getProps('products')
			.then(products => {
				cy.wrap(products).should('deep.equal',
					products.sort((a,b) => a.price >= b.price))
			})
	})

	it('sort by "Price (High to Low)"', () => {
		cy.react('SortSelector')
			.find('select')
			.select('price.desc')
			.should('have.value', 'price.desc')
			.find('option:selected')
			.should('have.text', 'Price (High to Low)')
		// wait for fetching result
		cy.wait(1500)
		// make sure product list is selected correctly
		cy.getReact('ProductList')
			.getReact('Products')
			.getProps('products')
			.then(products => {
				cy.wrap(products).should('deep.equal',
					products.sort((a,b) => a.price <= b.price))
			})
	})

	it('sort by "Discount"', () => {
		cy.react('SortSelector')
			.find('select')
			.select('discount.desc')
			.should('have.value', 'discount.desc')
			.find('option:selected')
			.should('have.text', 'Discount')
		// wait for fetching result
		cy.wait(1500)
		// make sure product list is selected correctly
		cy.getReact('ProductList')
			.getReact('Products')
			.getProps('products')
			.then(products => {
				cy.wrap(products).should('deep.equal',
					products.sort((a,b) => a.discount <= b.discount))
			})
	})

	it('sort by "Best Selling"', () => {
		cy.react('SortSelector')
			.find('select')
			.select('sold.desc')
			.should('have.value', 'sold.desc')
			.find('option:selected')
			.should('have.text', 'Best Selling')
		// wait for fetching result
		cy.wait(1500)
		// make sure product list is selected correctly
		cy.getReact('ProductList')
			.getReact('Products')
			.getProps('products')
			.then(products => {
				cy.wrap(products).should('deep.equal',
					products.sort((a,b) => a.sold <= b.sold))
			})
	})
})
describe('category page: price filter', () => {
	beforeEach(() => {
		cy.gotoSampleCategory()
	})

	it('should visible and have default value 0', () => {
		cy.react('PriceRangeFilter')
			.should('be.visible')
			.react('TextField')
			.should('be.visible')
		cy.getReact('PriceRangeFilter')
			.getReact('TextField')
			.each(el => {
				cy.wrap(el)
					.getProps('value')
					.should('eq', 0)
			})
		cy.react('PriceRangeFilter')
			.react('Button')
			.should('be.visible')
	})

	it('can be clear', () => {
		cy.react('PriceRangeFilter')
			.react('TextField')
			.find('input')
			.each(el => {
				cy.wrap(el)
					.clear()
			})
		cy.getReact('PriceRangeFilter')
			.getReact('TextField')
			.each(el => {
				cy.wrap(el)
					.getProps('value')
					.should('eq', '')
			})
	})

	it('can type', () => {
		cy.react('PriceRangeFilter')
			.react('TextField')
			.find('input')
			.each(el => {
				cy.wrap(el)
					.clear()
					.type('something')
			})
		cy.getReact('PriceRangeFilter')
			.getReact('TextField')
			.each(el => {
				cy.wrap(el)
					.getProps('value')
					.should('eq', 'something')
			})
	})

	it('without input', () => {
		cy.react('PriceRangeFilter')
			.react('TextField')
			.find('input')
			.each(el => {
				cy.wrap(el)
					.clear()
			})
		cy.react('PriceRangeFilter')
			.react('Button')
			.click()
		// should do notthing
		cy.react('ProductList')
			.react('ProductListSkeleton', { options: { timeout: 1500 }})
			.should('not.exist')
	})

	it('with default input 0-0', () => {
		cy.react('PriceRangeFilter')
			.react('Button')
			.click()
		// wait for fetch result
		cy.wait(1000)
		// should filter result is correct
		cy.get('div#product-count')
			.then(productCount => {
				cy.log(productCount.text())
				if (productCount.text().includes('Found 0 items')) {
					cy.get('div#products')
						.should('contain', 'There are no available product now!')
				} else {
					cy.react('ProductList')
						.react('ProductCard')
						.should('contain', '$0')
				}
			})
	})

	it('with input not number', () => {
		cy.react('PriceRangeFilter')
			.react('TextField')
			.find('input')
			.each(el => {
				cy.wrap(el)
					.clear()
					.type('a')
			})
		cy.react('PriceRangeFilter')
			.react('Button')
			.click()
		// should do notthing
		cy.react('ProductList')
			.react('ProductListSkeleton', { options: { timeout: 1500 }})
			.should('not.exist')
	})

	it('with input negative number', () => {
		cy.react('PriceRangeFilter')
			.react('TextField')
			.find('input')
			.each(el => {
				cy.wrap(el)
					.clear()
					.type(-1)
			})
		cy.react('PriceRangeFilter')
			.react('Button')
			.click()
		// should do notthing
		cy.react('ProductList')
			.react('ProductListSkeleton', { options: { timeout: 1500 }})
			.should('not.exist')
	})

	it('with input negative number - valid number', () => {
		cy.react('PriceRangeFilter')
			.react('TextField')
			.find('input')
			.each((el, i) => {
				if (i == 0) {
					cy.wrap(el)
						.clear()
						.type(-1)
				} else if (i == 1) {
					cy.wrap(el)
						.clear()
						.type(10)
				}
			})
		cy.react('PriceRangeFilter')
			.react('Button')
			.click()
		// should do notthing
		cy.react('ProductList')
			.react('ProductListSkeleton', { options: { timeout: 1500 }})
			.should('not.exist')
	})

	it('with valid input 0-20', () => {
		const lowPrice = 0
		const highPrice = 20
		cy.react('PriceRangeFilter')
			.react('TextField')
			.find('input')
			.each((el, i) => {
				if (i == 0) {
					cy.wrap(el)
						.clear()
						.type(lowPrice)
				} else if (i == 1) {
					cy.wrap(el)
						.clear()
						.type(highPrice)
				}
			})
		cy.react('PriceRangeFilter')
			.react('Button')
			.click()
		// wait for fetch result
		cy.wait(1500)
		// should filter result is correct
		cy.get('div#product-count')
			.then(productCount => {
				cy.log(productCount.text())
				if (productCount.text().includes('Found 0 items')) {
					cy.get('div#products')
						.should('contain', 'There are no available product now!')
				} else {
					cy.getReact('ProductList')
						.getReact('Products')
						.getProps('products')
						.each(product => {
							cy.wrap(product.price)
								.should('be.gte', lowPrice)
								.should('be.lte', highPrice)
						})
				}
			})
	})

	it('with valid input 0-1', () => {
		const lowPrice = 0
		const highPrice = 1
		cy.react('PriceRangeFilter')
			.react('TextField')
			.find('input')
			.each((el, i) => {
				if (i == 0) {
					cy.wrap(el)
						.clear()
						.type(lowPrice)
				} else if (i == 1) {
					cy.wrap(el)
						.clear()
						.type(highPrice)
				}
			})
		cy.react('PriceRangeFilter')
			.react('Button')
			.click()
		// wait for fetch result
		cy.wait(1500)
		// should filter result is correct
		cy.get('div#product-count')
			.then(productCount => {
				cy.log(productCount.text())
				if (productCount.text().includes('Found 0 items')) {
					cy.get('div#products')
						.should('contain', 'There are no available product now!')
				} else {
					cy.getReact('ProductList')
						.getReact('Products')
						.getProps('products')
						.each(product => {
							cy.wrap(product.price)
								.should('be.gte', lowPrice)
								.should('be.lte', highPrice)
						})
				}
			})
	})

	it('with valid input 0-9999999999', () => {
		const lowPrice = 0
		const highPrice = 10
		cy.react('PriceRangeFilter')
			.react('TextField')
			.find('input')
			.each((el, i) => {
				if (i == 0) {
					cy.wrap(el)
						.clear()
						.type(lowPrice)
				} else if (i == 1) {
					cy.wrap(el)
						.clear()
						.type(highPrice)
				}
			})
		cy.react('PriceRangeFilter')
			.react('Button')
			.click()
		// wait for fetch result
		cy.wait(1500)
		// should filter result is correct
		cy.get('div#product-count')
			.then(productCount => {
				cy.log(productCount.text())
				if (productCount.text().includes('Found 0 items')) {
					cy.get('div#products')
						.should('contain', 'There are no available product now!')
				} else {
					cy.getReact('ProductList')
						.getReact('Products')
						.getProps('products')
						.each(product => {
							cy.wrap(product.price)
								.should('be.gte', lowPrice)
								.should('be.lte', highPrice)
						})
				}
			})
	})

	it('with invalid input 0-10000000000', () => {
		const lowPrice = 0
		const highPrice = 10
		cy.react('PriceRangeFilter')
			.react('TextField')
			.find('input')
			.each((el, i) => {
				if (i == 0) {
					cy.wrap(el)
						.clear()
						.type(lowPrice)
				} else if (i == 1) {
					cy.wrap(el)
						.clear()
						.type(highPrice)
				}
			})
		cy.react('PriceRangeFilter')
			.react('Button')
			.click()
		// should do notthing
		cy.react('ProductList')
			.react('ProductListSkeleton', { options: { timeout: 1500 }})
			.should('not.exist')
	})
})
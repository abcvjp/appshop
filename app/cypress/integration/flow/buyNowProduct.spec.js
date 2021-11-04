describe('buy now product', () => {
	describe('buy now product from search page', () => {
		beforeEach(() => {
			cy.searchSampleProduct()
		})

		it('go to home page,search product and go to product detail page, click buy now and checkout', () => {
			// select product
			cy.react('ProductCard')
				.eq(0)
				.click()
				.waitForReact()
			// click buy now
			cy.get('div#select-area')
				.react('Button')
				.eq(1)
				.click()
			// should navigate to checkout page
			cy.location('pathname')
				.should('eq', '/checkout')
			// checkout
			cy.checkoutWithSampleInfo()
			// wait order
			cy.wait(2000)
			// check ordered successfully
			cy.react('SuccessDialog')
				.should('be.visible')
				.should('contain.text', 'Ordered successfully')
				// click to go to home page
				.react('Button')
				.click()
			// should redirect to home page
			cy.location('pathname')
				.should('eq', '/')
		})

		it('go to home page,search product and go to product detail page, input a valid quantity then click buy now and checkout', () => {
			// select product
			cy.react('ProductCard')
				.eq(0)
				.click()
				.waitForReact()
			// input quantity
			cy.get('div#select-area')
				.react('QuantitySelector')
				.react('InputBase')
				.find('input')
				.clear()
				.type(3)
			// click buy now
			cy.get('div#select-area')
				.react('Button')
				.eq(1)
				.click()
			// should navigate to checkout page
			cy.location('pathname')
				.should('eq', '/checkout')
			// checkout
			cy.checkoutWithSampleInfo()
			// wait order
			cy.wait(2000)
			// check ordered successfully
			cy.react('SuccessDialog')
				.should('be.visible')
				.should('contain.text', 'Ordered successfully')
				// click to go to home page
				.react('Button')
				.click()
			// should redirect to home page
			cy.location('pathname')
				.should('eq', '/')
		})
	})
	
	describe('buy now product from home page', () => {
		beforeEach(() => {
			cy.gotoHome()
		})

		it('go to home page,select a product and go to product detail page, click buy now and checkout', () => {
			// select product
			cy.react('ProductCard')
				.eq(0)
				.click()
				.waitForReact()
			// click buy now
			cy.get('div#select-area')
				.react('Button')
				.eq(1)
				.click()
			// should navigate to checkout page
			cy.location('pathname')
				.should('eq', '/checkout')
			// checkout
			cy.checkoutWithSampleInfo()
			// wait order
			cy.wait(2000)
			// check ordered successfully
			cy.react('SuccessDialog')
				.should('be.visible')
				.should('contain.text', 'Ordered successfully')
				// click to go to home page
				.react('Button')
				.click()
			// should redirect to home page
			cy.location('pathname')
				.should('eq', '/')
		})

		it('go to home page,select a product and go to product detail page, input a valid quantity then click buy now and checkout', () => {
			// select product
			cy.react('ProductCard')
				.eq(0)
				.click()
				.waitForReact()
			// input quantity
			cy.get('div#select-area')
				.react('QuantitySelector')
				.react('InputBase')
				.find('input')
				.clear()
				.type(3)
			// click buy now
			cy.get('div#select-area')
				.react('Button')
				.eq(1)
				.click()
			// should navigate to checkout page
			cy.location('pathname')
				.should('eq', '/checkout')
			// checkout
			cy.checkoutWithSampleInfo()
			// wait order
			cy.wait(2000)
			// check ordered successfully
			cy.react('SuccessDialog')
				.should('be.visible')
				.should('contain.text', 'Ordered successfully')
				// click to go to home page
				.react('Button')
				.click()
			// should redirect to home page
			cy.location('pathname')
				.should('eq', '/')
		})
	})

	describe('buy now product from category page', () => {
		beforeEach(() => {
			cy.gotoSampleCategory()
		})

		it('go to category page,select a product and go to product detail page, click buy now and checkout', () => {
			// select product
			cy.react('ProductCard')
				.eq(0)
				.click()
				.waitForReact()
			// click buy now
			cy.get('div#select-area')
				.react('Button')
				.eq(1)
				.click()
			// should navigate to checkout page
			cy.location('pathname')
				.should('eq', '/checkout')
			// checkout
			cy.checkoutWithSampleInfo()
			// wait order
			cy.wait(2000)
			// check ordered successfully
			cy.react('SuccessDialog')
				.should('be.visible')
				.should('contain.text', 'Ordered successfully')
				// click to go to home page
				.react('Button')
				.click()
			// should redirect to home page
			cy.location('pathname')
				.should('eq', '/')
		})

		it('go to category page,select a product and go to product detail page, input a valid quantity then click buy now and checkout', () => {
			// select product
			cy.react('ProductCard')
				.eq(0)
				.click()
				.waitForReact()
			// input quantity
			cy.get('div#select-area')
				.react('QuantitySelector')
				.react('InputBase')
				.find('input')
				.clear()
				.type(3)
			// click buy now
			cy.get('div#select-area')
				.react('Button')
				.eq(1)
				.click()
			// should navigate to checkout page
			cy.location('pathname')
				.should('eq', '/checkout')
			// checkout
			cy.checkoutWithSampleInfo()
			// wait order
			cy.wait(2000)
			// check ordered successfully
			cy.react('SuccessDialog')
				.should('be.visible')
				.should('contain.text', 'Ordered successfully')
				// click to go to home page
				.react('Button')
				.click()
			// should redirect to home page
			cy.location('pathname')
				.should('eq', '/')
		})
	})
})
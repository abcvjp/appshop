describe('standard buy product flow', () => {
	describe('standard buy product flow: from home page', () => {
		beforeEach(() => {
			cy.gotoHome();
		})

		afterEach(() => {
			cy.clearCookies()
		})

		it('visit home page, add a product to cart, view mini cart and go to cart page, then checkout', () => {
			// add a product to cart
			cy.react('ProductCard')		
				.eq(0)
				.react('CardActions')
				.react('Button')
				.click()
			// click to go to cart page
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('ContainedButton')
				.eq(1)
				.click()
				.waitForReact()
				.location('pathname')
				.should('eq', '/cart')
			// click to checkout page
			cy.react('CartSummary')
				.find('#checkout-button')
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

		it('visit home page, add multiple product to cart, view mini cart and go to cart page, then checkout', () => {
			// add a products to cart
			const productNumber = 4
			for (let i=0; i<productNumber; i++) {
				cy.react('ProductCard')		
					.eq(i)
					.react('CardActions')
					.react('Button')
					.click()
			}
			// click to go to cart page
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('ContainedButton')
				.eq(1)
				.click()
				.waitForReact()
				.location('pathname')
				.should('eq', '/cart')
			// click to checkout page
			cy.react('CartSummary')
				.find('#checkout-button')
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

		it('visit home page, add multiple product to cart, view mini cart and go to cart page, unselect a product, then checkout', () => {
			// add a products to cart
			const productNumber = 4
			for (let i=0; i<productNumber; i++) {
				cy.react('ProductCard')		
					.eq(i)
					.react('CardActions')
					.react('Button')
					.click()
			}
			// click to go to cart page
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('ContainedButton')
				.eq(1)
				.click()
				.waitForReact()
				.location('pathname')
				.should('eq', '/cart')
			// unselect a product
			cy.react('CartDetail')
				.react('CartItem')
				.react('Checkbox')
				.eq(0)
				.click()
			// click to checkout page
			cy.react('CartSummary')
				.find('#checkout-button')
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

	describe('standard buy product flow: from category page', () => {
		beforeEach(() => {
			cy.gotoSampleCategory();
		})

		afterEach(() => {
			cy.clearCookies()
		})

		it('visit category page, add a product to cart, view mini cart and go to cart page, then checkout', () => {
			// add a product to cart
			cy.react('ProductCard')		
				.eq(0)
				.react('CardActions')
				.react('Button')
				.click()
			// click to go to cart page
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('ContainedButton')
				.eq(1)
				.click()
				.waitForReact()
				.location('pathname')
				.should('eq', '/cart')
			// click to checkout page
			cy.react('CartSummary')
				.find('#checkout-button')
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

		it('visit category page, add multiple product to cart, view mini cart and go to cart page, then checkout', () => {
			// add a products to cart
			const productNumber = 4
			for (let i=0; i<productNumber; i++) {
				cy.react('ProductCard')		
					.eq(i)
					.react('CardActions')
					.react('Button')
					.click()
			}
			// click to go to cart page
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('ContainedButton')
				.eq(1)
				.click()
				.waitForReact()
				.location('pathname')
				.should('eq', '/cart')
			// click to checkout page
			cy.react('CartSummary')
				.find('#checkout-button')
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

		it('visit category page, add multiple product to cart, view mini cart and go to cart page, unselect a product, then checkout', () => {
			// add a products to cart
			const productNumber = 4
			for (let i=0; i<productNumber; i++) {
				cy.react('ProductCard')		
					.eq(i)
					.react('CardActions')
					.react('Button')
					.click()
			}
			// click to go to cart page
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('ContainedButton')
				.eq(1)
				.click()
				.waitForReact()
				.location('pathname')
				.should('eq', '/cart')
			// unselect a product
			cy.react('CartDetail')
				.react('CartItem')
				.react('Checkbox')
				.eq(0)
				.click()
			// click to checkout page
			cy.react('CartSummary')
				.find('#checkout-button')
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

	describe('standard buy product flow: from search page', () => {
		beforeEach(() => {
			cy.searchSampleProduct();
		})

		afterEach(() => {
			cy.clearCookies()
		})

		it('visit home page, search product, add a product to cart, view mini cart and go to cart page, then checkout', () => {
			// add a product to cart
			cy.react('ProductCard')		
				.eq(0)
				.react('CardActions')
				.react('Button')
				.click()
			// click to go to cart page
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('ContainedButton')
				.eq(1)
				.click()
				.waitForReact()
				.location('pathname')
				.should('eq', '/cart')
			// click to checkout page
			cy.react('CartSummary')
				.find('#checkout-button')
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

		it('visit home page, search product, add multiple product to cart, view mini cart and go to cart page, then checkout', () => {
			// add a products to cart
			const productNumber = 4
			for (let i=0; i<productNumber; i++) {
				cy.react('ProductCard')		
					.eq(i)
					.react('CardActions')
					.react('Button')
					.click()
			}
			// click to go to cart page
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('ContainedButton')
				.eq(1)
				.click()
				.waitForReact()
				.location('pathname')
				.should('eq', '/cart')
			// click to checkout page
			cy.react('CartSummary')
				.find('#checkout-button')
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

		it('visit home page, search product, add multiple product to cart, view mini cart and go to cart page, unselect a product, then checkout', () => {
			// add a products to cart
			const productNumber = 4
			for (let i=0; i<productNumber; i++) {
				cy.react('ProductCard')		
					.eq(i)
					.react('CardActions')
					.react('Button')
					.click()
			}
			// click to go to cart page
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('ContainedButton')
				.eq(1)
				.click()
				.waitForReact()
				.location('pathname')
				.should('eq', '/cart')
			// unselect a product
			cy.react('CartDetail')
				.react('CartItem')
				.react('Checkbox')
				.eq(0)
				.click()
			// click to checkout page
			cy.react('CartSummary')
				.find('#checkout-button')
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

	describe('standard buy product flow: from product page', () => {
		beforeEach(() => {
			cy.gotoSampleProduct2();
		})

		afterEach(() => {
			cy.clearCookies()
		})
		
		it('visit product page, add product to cart, view mini cart and go to cart page, then checkout', () => {
			// click add to cart
			cy.get('div#select-area')
				.react('Button')
				.eq(0)
				.click()
			// click to go to cart page
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('ContainedButton')
				.eq(1)
				.click()
				.waitForReact()
				.location('pathname')
				.should('eq', '/cart')
			// click to checkout page
			cy.react('CartSummary')
				.find('#checkout-button')
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

		it('visit product page, input a quantity then add product to cart, view mini cart and go to cart page, then checkout', () => {
			// type the quantity
			cy.get('div#select-area')
				.react('QuantitySelector')
				.react('InputBase')
				.find('input')
				.clear()
				.type(3)
			// click add to cart
			cy.get('div#select-area')
				.react('Button')
				.eq(0)
				.click()
			// click to go to cart page
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('ContainedButton')
				.eq(1)
				.click()
				.waitForReact()
				.location('pathname')
				.should('eq', '/cart')
			// click to checkout page
			cy.react('CartSummary')
				.find('#checkout-button')
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
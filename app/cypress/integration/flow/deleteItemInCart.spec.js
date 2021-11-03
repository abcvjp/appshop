describe('delete item in cart', () => {
	describe('delete item from mini cart', () => {
		it('add a product to cart then delete it', () => {
			// add a ptoduct to cart
			cy.gotoSampleCategory();
			cy.react('ProductCard')		
				.eq(0)
				.react('CardActions')
				.react('Button')
				.click()
			// product should appear in mini cart and have qty 1
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('MiniCartDetail')
				.react('MiniCartItem')
				.should('have.length', 1)
			// click delete item from cart
			cy.react('MiniCart').trigger('mouseover')
				.react('MiniCartDetail')
				.react('MiniCartItem')
				.find('button')
				.click()
			// click confirm delete
			cy.react('ConfirmDialog')
				.react('Button').eq(1).click()
			// check delete success
			// mini cart empty
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('MiniCartDetail', { options: { timeout: 1500 } })
				.should('not.exist')
			cy.react('MiniCart').react('Typography').should('contain', 'Your cart is current empty')
			cy.react('MiniCart')
		})

		it('add multiple product to cart and delete a item', () => {
			const productNumber = 8
			// add products to cart
			cy.gotoSampleCategory();
			for (let i=0; i<productNumber; i++) {
				cy.react('ProductCard')		
					.eq(i)
					.react('CardActions')
					.react('Button')
					.click()
			}
			// click delete a item from cart
			cy.react('MiniCart').trigger('mouseover')
				.react('MiniCartDetail')
				.react('MiniCartItem')
				.should('have.length', productNumber)
				.eq(0)
				.find('button')
				.click()
			// click confirm delete
			cy.react('ConfirmDialog')
				.react('Button').eq(1).click()
			// check delete success
			cy.react('MiniCart').trigger('mouseover')
				.react('MiniCartDetail')
				.react('MiniCartItem')
				.should('have.length', productNumber-1)
		})

		it('add multiple product to cart and delete all item', () => {
			const productNumber = 8
			// add products to cart
			cy.gotoSampleCategory();
			for (let i=0; i<productNumber; i++) {
				cy.react('ProductCard')		
					.eq(i)
					.react('CardActions')
					.react('Button')
					.click()
			}
			// click delete items from cart
			for (let i=1; i<= productNumber; i++) {
				cy.react('MiniCart').trigger('mouseover')
				.react('MiniCartDetail')
				.react('MiniCartItem')
				.eq(0)
				.find('button')
				.click()
				// click confirm delete
				cy.react('ConfirmDialog')
					.react('Button').eq(1).click()
			}
			// check delete success
			// mini cart empty
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('MiniCartDetail', { options: { timeout: 1500 } })
				.should('not.exist')
			cy.react('MiniCart').react('Typography').should('contain', 'Your cart is current empty')
			cy.react('MiniCart')
		})
	})

	describe('delete item from cart page', () => {
		it('add a product to cart, go to cart page and delete it', () => {
			// add a ptoduct to cart
			cy.gotoSampleCategory();
			cy.react('ProductCard')		
				.eq(0)
				.react('CardActions')
				.react('Button')
				.click()
			// click mini cart icon to go to cart page
			cy.react('MiniCart')
				.click()
				.trigger('mouseout')
			// click delete item
			cy.react('CartDetail')
				.react('CartItem')
				.react('IconButton')
				.eq(0)
				.click()
			// click confirm delete
			cy.react('ConfirmDialog')
				.react('Button').eq(1).click()
			// check cart page is empty
			cy.react('CartDetail', { options: {timeout: 1500 }})
				.should('not.exist')
			cy.react('CartPage')
				.should('contain.text', 'Your cart is empty, let buy some product!')
		})

		it('add multiple product to cart, go to cart page and delete a item', () => {
			const productNumber = 8
			// add products to cart
			cy.gotoSampleCategory();
			for (let i=0; i<productNumber; i++) {
				cy.react('ProductCard')		
					.eq(i)
					.react('CardActions')
					.react('Button')
					.click()
			}
			// click mini cart icon to go to cart page
			cy.react('MiniCart')
				.click()
				.trigger('mouseout')
			// click delete item
			cy.react('CartDetail')
				.react('CartItem')
				.eq(0)
				.react('IconButton')
				.eq(0)
				.click()
			// click confirm delete
			cy.react('ConfirmDialog')
				.react('Button').eq(1).click()
			// check delete success
			cy.react('CartDetail')
				.react('CartItem')
				.should('have.length', productNumber-1)
		})

		it('add multiple product to cart, go to cart page and delete all item step by step', () => {
			const productNumber = 8
			// add products to cart
			cy.gotoSampleCategory();
			for (let i=0; i<productNumber; i++) {
				cy.react('ProductCard')		
					.eq(i)
					.react('CardActions')
					.react('Button')
					.click()
			}
			// click mini cart icon to go to cart page
			cy.react('MiniCart')
				.click()
				.trigger('mouseout')
			// click delete item
			for (let i=0; i<productNumber; i++) {
				cy.react('CartDetail')
				.react('CartItem')
				.eq(0)
				.react('IconButton')
				.eq(0)
				.click()
				// click confirm delete
				cy.react('ConfirmDialog')
					.react('Button').eq(1).click()
			}
			// check cart page is empty
			cy.react('CartDetail', { options: {timeout: 1500 }})
				.should('not.exist')
			cy.react('CartPage')
				.should('contain.text', 'Your cart is empty, let buy some product!')
		})

		it('add multiple product to cart, go to cart page and delete all item by delete all button', () => {
			const productNumber = 8
			// add products to cart
			cy.gotoSampleCategory();
			for (let i=0; i<productNumber; i++) {
				cy.react('ProductCard')		
					.eq(i)
					.react('CardActions')
					.react('Button')
					.click()
			}
			// click mini cart icon to go to cart page
			cy.react('MiniCart')
				.click()
				.trigger('mouseout')
			// click delete all item
			cy.react('CartDetail')
				.react('IconButton')
				.eq(0)
				.click()
			// click confirm delete
			cy.react('ConfirmDialog')
				.react('Button').eq(1).click()
			// check cart page is empty
			cy.react('CartDetail', { options: {timeout: 1500 }})
				.should('not.exist')
			cy.react('CartPage')
				.should('contain.text', 'Your cart is empty, let buy some product!')
		})
	})

})
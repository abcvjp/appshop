describe('add product to cart', () => {
	describe('add product to cart from home page', () => {
		beforeEach(() => {
			cy.gotoHome()
		})

		afterEach(() => {
			cy.clearCookies()
		})

		it('visit home page, add a valid product to cart, view mini cart then go to cart page', () => {
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
				.should('contain.text', 'Quần âu - QKST23424')
				.should('contain.text', 'Qty: 1')
			// click to go to cart page
			cy.react('MiniCart')
				.react('ContainedButton')
				.eq(1)
				.click()
				.waitForReact()
			// check cart page have product
			cy.location('pathname')
				.should('eq', '/cart')
			cy.react('CartDetail')
				.react('CartItem')
				.should('have.length', 1)
				.should('contain.text', 'Quần âu - QKST23424')
		})

		it('visit home page, add a valid product to cart multiple times, then go to cart page', () => {
			const times = 10
			for (let i=1; i<=times; i++) {
				cy.react('ProductCard')		
					.eq(0)
					.react('CardActions')
					.react('Button')
					.click()
				// product should appear in mini cart
				cy.react('MiniCart')
					.trigger('mouseover')
					.react('MiniCartDetail')
					.react('MiniCartItem')
					.should('have.length', 1)
					.should('contain.text', 'Quần âu - QKST23424')
					.should('contain.text', `Qty: ${i}`)
					.trigger('mouseout')
			}
			// click to go to cart page
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('ContainedButton')
				.eq(1)
				.click()
				.waitForReact()
			// check cart page have product
			cy.location('pathname')
				.should('eq', '/cart')
			cy.react('CartDetail')
				.react('CartItem')
				.should('have.length', 1)
				.find('input[type="number"]')
				.invoke('val')
				// item quantity is correct
				.should('eq', times.toString())
		})

		it('visit home page, add multiple valid product to cart, then go to cart page', () => {
			const productNumber = 4
			for (let i=0; i<productNumber; i++) {
				cy.react('ProductCard')		
					.eq(i)
					.react('CardActions')
					.react('Button')
					.click()
				// product should appear in mini cart
				cy.react('MiniCart')
					.trigger('mouseover')
					.react('MiniCartDetail')
					.react('MiniCartItem')
					.should('have.length', i+1)
					.eq(i)
					.should('contain.text', 'Qty: 1')
					.trigger('mouseout')
			}
			// click to go to cart page
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('ContainedButton')
				.eq(1)
				.click()
				.waitForReact()
			// check cart page have product
			cy.location('pathname')
				.should('eq', '/cart')
			cy.react('CartDetail')
				.react('CartItem')
				.should('have.length', productNumber)
				.find('input[type="number"]')
				.invoke('val')
				// item quantity is correct
				.should('eq', '1')
		})

		it('visit home page, add multiple valid product to cart with multiple times, then go to cart page', () => {
			const productNumber = 4
			const times = Array.from({length: 7}, () => Math.floor(Math.random()*5+1));
			for (let i=0; i<productNumber; i++) {
				for (let j=1; j<=times[i]; j++) {
					cy.react('ProductCard')		
					.eq(i)
					.react('CardActions')
					.react('Button')
					.click()
					.wait(500)
				}
				// product should appear in mini cart
				cy.react('MiniCart')
					.trigger('mouseover')
					.react('MiniCartDetail')
					.react('MiniCartItem')
					.should('have.length', i+1)
					.eq(i)
					.should('contain.text', `Qty: ${times[i]}`)
					.trigger('mouseout')
			}
			// click to go to cart page
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('ContainedButton')
				.eq(1)
				.click()
				.waitForReact()
			// check cart page have product
			cy.location('pathname')
				.should('eq', '/cart')
			cy.react('CartDetail')
				.react('CartItem')
				.should('have.length', productNumber)
		})
	})

	describe('add product to cart from category page', () => {
		beforeEach(() => {
			cy.gotoSampleCategory()
		})

		afterEach(() => {
			cy.clearCookies()
		})

		it('visit category page, add a valid product to cart, view mini cart then go to cart page', () => {
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
				.should('contain.text', 'Áo sơ mi - AR22752N2')
				.should('contain.text', 'Qty: 1')
			// click to go to cart page
			cy.react('MiniCart')
				.react('ContainedButton')
				.eq(1)
				.click()
				.waitForReact()
			// check cart page have product
			cy.location('pathname')
				.should('eq', '/cart')
			cy.react('CartDetail')
				.react('CartItem')
				.should('have.length', 1)
				.should('contain.text', 'Áo sơ mi - AR22752N2')
		})

		it('visit category page, add a valid product to cart multiple times, then go to cart page', () => {
			const times = 10
			for (let i=1; i<=times; i++) {
				cy.react('ProductCard')		
					.eq(0)
					.react('CardActions')
					.react('Button')
					.click()
				// product should appear in mini cart
				cy.react('MiniCart')
					.trigger('mouseover')
					.react('MiniCartDetail')
					.react('MiniCartItem')
					.should('have.length', 1)
					.should('contain.text', 'Áo sơ mi - AR22752N2')
					.should('contain.text', `Qty: ${i}`)
					.trigger('mouseout')
			}
			// click to go to cart page
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('ContainedButton')
				.eq(1)
				.click()
				.waitForReact()
			// check cart page have product
			cy.location('pathname')
				.should('eq', '/cart')
			cy.react('CartDetail')
				.react('CartItem')
				.should('have.length', 1)
				.find('input[type="number"]')
				.invoke('val')
				// item quantity is correct
				.should('eq', times.toString())
		})

		it('visit category page, add multiple valid product to cart, then go to cart page', () => {
			const productNumber = 6
			for (let i=0; i<productNumber; i++) {
				cy.react('ProductCard')		
					.eq(i)
					.react('CardActions')
					.react('Button')
					.click()
				// product should appear in mini cart
				cy.react('MiniCart')
					.trigger('mouseover')
					.react('MiniCartDetail')
					.react('MiniCartItem')
					.should('have.length', i+1)
					.eq(i)
					.should('contain.text', 'Qty: 1')
					.trigger('mouseout')
			}
			// click to go to cart page
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('ContainedButton')
				.eq(1)
				.click()
				.waitForReact()
			// check cart page have product
			cy.location('pathname')
				.should('eq', '/cart')
			cy.react('CartDetail')
				.react('CartItem')
				.should('have.length', productNumber)
				.find('input[type="number"]')
				.invoke('val')
				// item quantity is correct
				.should('eq', '1')
		})

		it('visit category page, add multiple valid product to cart with multiple times, then go to cart page', () => {
			const productNumber = 7
			const times = Array.from({length: 7}, () => Math.floor(Math.random()*5+1));
			for (let i=0; i<productNumber; i++) {
				for (let j=1; j<=times[i]; j++) {
					cy.react('ProductCard')		
					.eq(i)
					.react('CardActions')
					.react('Button')
					.click()
					.wait(500)
				}
				// product should appear in mini cart
				cy.react('MiniCart')
					.trigger('mouseover')
					.react('MiniCartDetail')
					.react('MiniCartItem')
					.should('have.length', i+1)
					.eq(i)
					.should('contain.text', `Qty: ${times[i]}`)
					.trigger('mouseout')
			}
			// click to go to cart page
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('ContainedButton')
				.eq(1)
				.click()
				.waitForReact()
			// check cart page have product
			cy.location('pathname')
				.should('eq', '/cart')
			cy.react('CartDetail')
				.react('CartItem')
				.should('have.length', productNumber)
		})
	})

	describe('search product, add product to cart from search page', () => {
		beforeEach(() => {
			cy.gotoSampleSearch()
		})

		afterEach(() => {
			cy.clearCookies()
		})

		it('add a valid product to cart, view mini cart then go to cart page', () => {
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
				.should('contain.text', 'Quần tây - QD20313')
				.should('contain.text', 'Qty: 1')
			// click to go to cart page
			cy.react('MiniCart')
				.react('ContainedButton')
				.eq(1)
				.click()
				.waitForReact()
			// check cart page have product
			cy.location('pathname')
				.should('eq', '/cart')
			cy.react('CartDetail')
				.react('CartItem')
				.should('have.length', 1)
				.should('contain.text', 'Quần tây - QD20313')
		})

		it('search product, add a valid product to cart multiple times, then go to cart page', () => {
			const times = 5
			for (let i=1; i<=times; i++) {
				cy.react('ProductCard')		
					.eq(0)
					.react('CardActions')
					.react('Button')
					.click()
				// product should appear in mini cart
				cy.react('MiniCart')
					.trigger('mouseover')
					.react('MiniCartDetail')
					.react('MiniCartItem')
					.should('have.length', 1)
					.should('contain.text', 'Quần tây - QD20313')
					.should('contain.text', `Qty: ${i}`)
					.trigger('mouseout')
			}
			// click to go to cart page
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('ContainedButton')
				.eq(1)
				.click()
				.waitForReact()
			// check cart page have product
			cy.location('pathname')
				.should('eq', '/cart')
			cy.react('CartDetail')
				.react('CartItem')
				.should('have.length', 1)
				.find('input[type="number"]')
				.invoke('val')
				// item quantity is correct
				.should('eq', times.toString())
		})

		it('search product, add multiple valid product to cart, then go to cart page', () => {
			const productNumber = 6
			for (let i=0; i<productNumber; i++) {
				cy.react('ProductCard')		
					.eq(i)
					.react('CardActions')
					.react('Button')
					.click()
				// product should appear in mini cart
				cy.react('MiniCart')
					.trigger('mouseover')
					.react('MiniCartDetail')
					.react('MiniCartItem')
					.should('have.length', i+1)
					.eq(i)
					.should('contain.text', 'Qty: 1')
					.trigger('mouseout')
			}
			// click to go to cart page
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('ContainedButton')
				.eq(1)
				.click()
				.waitForReact()
			// check cart page have product
			cy.location('pathname')
				.should('eq', '/cart')
			cy.react('CartDetail')
				.react('CartItem')
				.should('have.length', productNumber)
				.find('input[type="number"]')
				.invoke('val')
				// item quantity is correct
				.should('eq', '1')
		})

		it('search product, add multiple valid product to cart with multiple times, then go to cart page', () => {
			const productNumber = 7
			const times = Array.from({length: 7}, () => Math.floor(Math.random()*6+1));
			for (let i=0; i<productNumber; i++) {
				for (let j=1; j<=times[i]; j++) {
					cy.react('ProductCard')		
					.eq(i)
					.react('CardActions')
					.react('Button')
					.click()
					.wait(500)
				}
				// product should appear in mini cart
				cy.react('MiniCart')
					.trigger('mouseover')
					.react('MiniCartDetail')
					.react('MiniCartItem')
					.should('have.length', i+1)
					.eq(i)
					.should('contain.text', `Qty: ${times[i]}`)
					.trigger('mouseout')
			}
			// click to go to cart page
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('ContainedButton')
				.eq(1)
				.click()
				.waitForReact()
			// check cart page have product
			cy.location('pathname')
				.should('eq', '/cart')
			cy.react('CartDetail')
				.react('CartItem')
				.should('have.length', productNumber)
		})
	})

	describe('view a product, add product to cart from product page', () => {
		beforeEach(() => {
			cy.gotoSampleProduct()
		})

		afterEach(() => {
			cy.clearCookies()
		})

		it('add product to cart with quantity = 1, view mini cart and go to cart page', () => {
			// click add to cart
			cy.get('div#select-area')
				.react('Button')
				.eq(0)
				.click()
			// product should appear in mini cart and have valid quantity
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('MiniCartDetail')
				.react('MiniCartItem')
				.should('have.length', 1)
				.should('contain.text', 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY')
				.should('contain.text', 'Qty: 1')
			// click to go to cart page
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('ContainedButton')
				.eq(1)
				.click()
				.waitForReact()
			// check cart page have product
			cy.location('pathname')
				.should('eq', '/cart')
			cy.react('CartDetail')
				.react('CartItem')
				.should('have.length', 1)
				.find('input[type="number"]')
				.invoke('val')
				// item quantity is correct
				.should('eq', '1')
		})

		it('view a product, add product to cart with 1 < quantity < max, view mini cart and go to cart page', () => {
			const quantity = 60
			// input quantity
			cy.get('div#select-area')
			.react('QuantitySelector')
			.react('InputBase')
			.find('input')
			.clear()
			.type(quantity)
			// click add to cart
			cy.get('div#select-area')
				.react('Button')
				.eq(0)
				.click()
			// product should appear in mini cart and have valid quantity
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('MiniCartDetail')
				.react('MiniCartItem')
				.should('have.length', 1)
				.should('contain.text', 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY')
				.should('contain.text', `Qty: ${quantity}`)
			// click to go to cart page
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('ContainedButton')
				.eq(1)
				.click()
				.waitForReact()
			// check cart page have product
			cy.location('pathname')
				.should('eq', '/cart')
			cy.react('CartDetail')
				.react('CartItem')
				.should('have.length', 1)
				.find('input[type="number"]')
				.invoke('val')
				// item quantity is correct
				.should('eq', quantity.toString())
		})

		it('view a product, add product to cart with quantity = max, view mini cart and go to cart page', () => {
			const quantity = 100
			// input quantity
			cy.get('div#select-area')
			.react('QuantitySelector')
			.react('InputBase')
			.find('input')
			.clear()
			.type(quantity)
			// click add to cart
			cy.get('div#select-area')
				.react('Button')
				.eq(0)
				.click()
			// product should appear in mini cart and have valid quantity
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('MiniCartDetail')
				.react('MiniCartItem')
				.should('have.length', 1)
				.should('contain.text', 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY')
				.should('contain.text', `Qty: ${quantity}`)
			// click to go to cart page
			cy.react('MiniCart')
				.trigger('mouseover')
				.react('ContainedButton')
				.eq(1)
				.click()
				.waitForReact()
			// check cart page have product
			cy.location('pathname')
				.should('eq', '/cart')
			cy.react('CartDetail')
				.react('CartItem')
				.should('have.length', 1)
				.find('input[type="number"]')
				.invoke('val')
				// item quantity is correct
				.should('eq', quantity.toString())
		})
	})
})
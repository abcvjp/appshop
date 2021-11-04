describe('product card', () => {
	describe('product cards in home', () => {
		before(() => {
			cy.gotoHome();
		})

		it('can show product information', () => {
			cy.react('ProductCard').each(card => {
				cy.wrap(card).should('be.visible')
					.react('CardMedia')
					.should('exist')
				// product info is visible
				cy.wrap(card)
					.react('CardContent')
					.react('Typography')
					.should('be.visible')
				// add to cart button
				cy.wrap(card)
					.react('CardActions')
					.react('Button')
					.should('be.visible')
					.should('contain', 'Add to Cart')
			})
		})

		it('can navigate correctly to product page', () => {
			cy.react('ProductCard').then(card => {
				cy.wrap(card).react('CardMedia')
				.click()
				.location('pathname').should('contain', 'product')
				.go('back')
			})
		})

		it('add to cart button work', () => {
			cy.react('ProductCard').react('CardActions')
				.react('Button')
				.click()
			cy.react('AlertMessage').should('be.visible')
		})
	})

	describe('product cards in category page', () => {
		before(() => {
			cy.gotoSampleCategory();
		})

		it('can show product information', () => {
			cy.react('ProductCard').each(card => {
				cy.wrap(card).should('be.visible')
					.react('CardMedia')
					.should('exist')
				// product info is visible
				cy.wrap(card)
					.react('CardContent')
					.react('Typography')
					.should('be.visible')
				// add to cart button
				cy.wrap(card)
					.react('CardActions')
					.react('Button')
					.should('be.visible')
					.should('contain', 'Add to Cart')
			})
		})

		it('can navigate correctly to product page', () => {
			cy.react('ProductCard').then(card => {
				cy.wrap(card).react('CardMedia')
				.click()
				.location('pathname').should('contain', 'product')
				.go('back')
			})
		})

		it('add to cart button work', () => {
			cy.react('ProductCard').react('CardActions')
				.react('Button')
				.click()
			cy.react('AlertMessage').should('be.visible')
		})
	})

	describe('product cards in search page', () => {
		before(() => {
			cy.gotoSampleSearch();
		})

		it('can show product information', () => {
			cy.react('ProductCard').each(card => {
				cy.wrap(card).should('be.visible')
					.react('CardMedia')
					.should('exist')
				// product info is visible
				cy.wrap(card)
					.react('CardContent')
					.react('Typography')
					.should('be.visible')
				// add to cart button
				cy.wrap(card)
					.react('CardActions')
					.react('Button')
					.should('be.visible')
					.should('contain', 'Add to Cart')
			})
		})

		it('can navigate correctly to product page', () => {
			cy.react('ProductCard').then(card => {
				cy.wrap(card).react('CardMedia')
				.click()
				.location('pathname').should('contain', 'product')
				.go('back')
			})
		})

		it('add to cart button work', () => {
			cy.react('ProductCard').react('CardActions')
				.react('Button')
				.click()
				.wait(500)
			cy.react('AlertMessage').should('be.visible')
		})
	})
})
import { DEFAULT_PAGE_SIZE } from '../../../constants';

describe('category page: pagination', () => {
	before(() => {
		cy.gotoSampleCategory()
		cy.wait(1000)
	})

	it('pagination is visible and have at least 1 page', () => {
		cy.react('ProductList')
			.find('.pagination')
			.should('be.visible')
		cy.getReact('ProductList')
			.getReact('PaginationItem')
			.should('have.length.at.least', 1)
		cy.getReact('ProductList')
			.getReact('Pagination')
			.getProps('page')
			.should('eq', 1)
	})

	it('page quantity is correct', () => {
		cy.getReact('ProductList')
			.getReact('PaginationItem')
			.should('have.length', 9)
	})

	it('can switch page', () => {
		cy.react('ProductList')
			.find('.pagination')
			.react('PaginationItem')
			.each((page,i) => {
				if (i < 7) {
					cy.react('ProductList')
						.find('.pagination')
						.react('PaginationItem')
						.eq(i+1)
						.click()
					// should switch page
					// cy.react('ProductList')
						// .find('div#products')
						// .react('ProductListSkeleton', { options: { timeout: 1500 }})
						// .should('exist')
				}
			})
	})
})
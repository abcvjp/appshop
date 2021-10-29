import { SAMPLE_PRODUCT as sampleProduct,
	SAMPLE_PRODUCT_BREADCRUMBS as sampleProductBreadcrumbs,
	SAMPLE_CATEGORY_BREADCRUMBS as sampleCategoryBreadcrumbs,
	SAMPLE_SEARCH_BREADCRUMBS as sampleSearchBreadcrumbs
} from '../../constants';

describe('breadcrumbs', () => {
	describe('breadcrumbs in product page', () => {
		before(() => {
			cy.gotoSampleProduct()
		})
		it('all breadcrumb is visible', () => {
			cy.react('Breadcrumbs')
				.react("Link")
				.should('be.visible')
		})
		it('breadcrumb show valid info', () => {
			cy.react('Breadcrumbs')
				.react('Link', { props: { color: 'inherit' } })
				.should('have.length', sampleProductBreadcrumbs.length-1)
			sampleProductBreadcrumbs.forEach((breadcrumb, i) => {
				if (i < sampleProductBreadcrumbs.length-1) {
					cy.react('Breadcrumbs')
						.react('Link', { props: { color: 'inherit' } })
						.eq(i)
						.should('contain', breadcrumb.name)
				} else {
					cy.react('Breadcrumbs')
						.react('Typography')
						.should('contain', breadcrumb.name)
				}
			})
		})
		it('breadcrumb can navigate correctly', () => {
			sampleProductBreadcrumbs.forEach((breadcrumb, i) => {
				if (i < sampleProductBreadcrumbs.length-1) {
					cy.react('Breadcrumbs')
						.react('Link', { props: { color: 'inherit' } })
						.eq(i)
						.click()
					cy.location('pathname')
						.should('eq', breadcrumb.path)
					cy.go('back')
				}
			})
		})
	})

	describe('breadcrumbs in category page', () => {
		beforeEach(() => {
			cy.gotoSampleCategory()
		})
		it('all breadcrumb is visible', () => {
			cy.react('Breadcrumbs')
				.react("Link")
				.should('be.visible')
		})
		it('breadcrumb show valid info', () => {
			cy.react('Breadcrumbs')
				.react('Link', { props: { color: 'inherit' } })
				.should('have.length', sampleCategoryBreadcrumbs.length-1)
			sampleCategoryBreadcrumbs.forEach((breadcrumb, i) => {
				if (i < sampleCategoryBreadcrumbs.length-1) {
					cy.react('Breadcrumbs')
						.react('Link', { props: { color: 'inherit' } })
						.eq(i)
						.should('contain', breadcrumb.name)
				} else {
					cy.react('Breadcrumbs')
						.react('Typography')
						.should('contain', breadcrumb.name)
				}
			})
		})
		it('breadcrumb can navigate correctly', () => {
			sampleCategoryBreadcrumbs.forEach((breadcrumb, i) => {
				if (i < sampleCategoryBreadcrumbs.length-2) {
					cy.react('Breadcrumbs')
						.react('Link')
						.eq(i)
						.click()
					cy.location('pathname')
						.should('eq', breadcrumb.path)
					cy.go('back')
				}
			})
		})
	})

	describe('breadcrumbs in search page', () => {
		before(() => {
			cy.gotoSampleSearch()
		})
		it('all breadcrumb is visible', () => {
			cy.react('Breadcrumbs')
				.react("Link")
				.should('be.visible')
		})
		it('breadcrumb show valid info', () => {
			cy.react('Breadcrumbs')
				.react('Link', { props: { color: 'inherit' } })
				.should('have.length', sampleSearchBreadcrumbs.length-1)
			sampleSearchBreadcrumbs.forEach((breadcrumb, i) => {
				if (i < sampleSearchBreadcrumbs.length-1) {
					cy.react('Breadcrumbs')
						.react('Link')
						.eq(i)
						.should('contain', breadcrumb.name)
				} else {
					cy.react('Breadcrumbs')
						.react('Typography')
						.should('contain', breadcrumb.name)
				}
			})
		})
		it('breadcrumb can navigate correctly', () => {
			sampleSearchBreadcrumbs.forEach((breadcrumb, i) => {
				if (i < sampleSearchBreadcrumbs.length-1) {
					cy.react('Breadcrumbs')
						.react('Link')
						.eq(i)
						.click()
					cy.location('pathname')
						.should('eq', breadcrumb.path)
					cy.go('back')
				}
			})
		})
	})
})
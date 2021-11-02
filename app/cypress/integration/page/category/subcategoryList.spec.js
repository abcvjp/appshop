import { SAMPLE_ROOT_CATEGORY as sampleRootCategory } from '../../../constants';

describe('category page: subcategory list', () => {
	beforeEach(() => {
		cy.visit('/' + sampleRootCategory.slug)
		cy.waitForReact()
	})
	it('should be visible and list correctly', () => {
		cy.react('CategorychildsTree')
			.should('be.visible')
			.react('TreeItem')
			.should('have.length', sampleRootCategory.childs.length)
			.each((item, i) => {
				cy.wrap(item)
					.should('contain', sampleRootCategory.childs[i].name)
			})
	})

	it('can expand and collapse', () => {
		cy.react('CategorychildsTree')
			.should('be.visible')
			.react('TreeItem')
			.find('svg')
			.each((el,i) => {
				cy.wrap(el).click()
			})
		cy.react('CategorychildsTree')
			.should('be.visible')
			.react('TreeItem')
			.find('svg')
			.each((el,i) => {
				cy.wrap(el).click()
			})
	})

	it('should navigate correctly', () => {
		cy.react('CategorychildsTree')
			.should('be.visible')
			.react('TreeItem')
			.each((item, i) => {
				cy.wrap(item)
					.click()
				cy.location('pathname')
					.should('eq', '/' + sampleRootCategory.childs[i].slug)
				cy.go('back')
				cy.location('pathname')
					.should('eq', '/' + sampleRootCategory.slug)
			})
	})
})
import { SAMPLE_PRODUCT as sampleProduct } from '../../../constants';

describe('product page: product detail', () => {
	before(() => {
		cy.gotoSampleProduct()
	})
	it('product detail is visible', () => {
		cy.react('ProductDetail')
			.should('be.visible')
	})
	it('product detail can show properly infomations', () => {
		cy.react('ProductDetail')
			.should('be.visible')
		cy.react('ProductDetail')
			.react('Typography')
			.should('contain', sampleProduct.title)
			.should('contain', `Sold ${sampleProduct.sold}`)
			.should('contain', `${sampleProduct.quantity} product left`)
			.should('contain', sampleProduct.short_description)
		cy.react('ProductDetail')
			.should('contain', `$${sampleProduct.price}`)
			.should('contain', `${sampleProduct.root_price}`)
	})
})
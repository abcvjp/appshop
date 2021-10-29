import { SAMPLE_PRODUCT as sampleProduct } from '../../../constants';

describe('product page: product images', () => {
	before(() => {
		cy.gotoSampleProduct()
	});
	
	it('Product image list is visible', () => {
		cy.react('ProductImages').get('div[id="product-images"]')
			.should('be.visible')
		cy.getReact('ProductImages').then(el => {
			cy.wrap(el).getProps('images.length').should('eq', sampleProduct.images.length)
		})
	})

	it('product image list can be next, prev', () => {
		for (let i=0; i<sampleProduct.images.length; i++) {
			cy.react('ProductImages')
				.react('Carousel')
				.find('img')
				.should('have.attr', 'src', sampleProduct.images[i].url)
			cy.react('ProductImages')
				.react('Carousel')
				.react('IconButton')
				.eq(0)
				.click()
				.wait(500)
		}
	})

	describe('product image viewer', () => {
		beforeEach(() => {
			cy.gotoSampleProduct()
		})
		it('product image viewr is normally invisible', () => {
			cy.react('ProductImages')
				.react('ProductImageViewer')
				.should('not.exist')
		})
		it('product image viewer is visible when click product image', () => {
			cy.react('ProductImages')
				.react('Carousel')
				.find('img')
				.click()
			cy.react('ProductImageViewer')
				.should('be.visible')
				.find('img')
				.should('be.visible')
		})
		it('product image viewer can next', () => {
			cy.react('ProductImages')
				.react('Carousel')
				.find('img')
				.click()
			for (let i=0; i<sampleProduct.images.length; i++) {
				cy.react('ProductImageViewer')
					.react('IconButton')
					.eq(1)
					.click()
			}
		})
		it('product image viewer can prev', () => {
			cy.react('ProductImages')
				.react('Carousel')
				.find('img')
				.click()
			for (let i=0; i<sampleProduct.images.length; i++) {
				cy.react('ProductImageViewer')
					.react('IconButton')
					.eq(0)
					.click()
			}
		})
		it('all image can show in viewer', () => {
			cy.react('ProductImages')
				.react('Carousel')
				.find('img')
				.click()
			for (let i=0; i<sampleProduct.images.length; i++) {
				cy.react('ProductImageViewer')
					.find('img')
					.should('be.visible')
				cy.react('ProductImageViewer')
					.react('IconButton')
					.eq(1)
					.click()
			}
		})
		it('product image viewer can close', () => {
			cy.react('ProductImages')
				.react('Carousel')
				.find('img')
				.click()
			cy.react('ProductImageViewer')
				.react('IconButton')
				.eq(2)
				.click()
			cy.react('ProductImages')
				.react('ProductImageViewer')
				.should('not.exist')
		})
	})
})
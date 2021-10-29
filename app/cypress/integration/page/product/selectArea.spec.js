import { SAMPLE_PRODUCT as sampleProduct } from '../../../constants';

describe('product page: quantitySelector', () => {
	beforeEach(() => {
		cy.gotoSampleProduct();
	})
	it('visible and have default value 1', () => {
		cy
			.get('div[id="select-area"]')
			.react('QuantitySelector')
			.should('be.visible')
			.react('TextField')
			.getReact('InputBase')
			.getProps('value')
			.should('eq', 1)
	})
	it('can clear', () => {
		cy.get('div#select-area')
			.react('QuantitySelector')
			.react('InputBase')
			.find('input')
			.clear()
		cy.get('div#select-area')
			.react('QuantitySelector')
			.getReact('InputBase')
			.getProps('value')
			.should('eq', '')
	})
	it('type number', () => {
		cy.get('div#select-area')
			.react('QuantitySelector')
			.react('InputBase')
			.find('input')
			.clear()
			.type(0)
		cy.get('div#select-area')
			.react('QuantitySelector')
			.getReact('InputBase')
			.getProps('value')
			.should('eq', 1)
	})
})
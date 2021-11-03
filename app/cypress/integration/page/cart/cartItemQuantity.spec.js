import { SAMPLE_CART_DATA } from '../../../constants';

const sampleCart = JSON.parse(SAMPLE_CART_DATA)

describe('cart page: cart item quantity', () => {
	beforeEach(() => {
		cy.gotoSampleCart();
	})

	it('visible and have correct default value', () => {
		cy.react('CartDetail')
			.getReact('TextField')
			.each((el,i) => {
				cy.wrap(el)
					.getProps('defaultValue')
					.should('eq', sampleCart[i].quantity)
			})
	})
	it('can clear', () => {
		cy.react('CartDetail')
			.react('TextField')
			.find('input')
			.each((el,i) => {
				cy.wrap(el)
					.clear()
					.invoke('val')
					.should('eq', '')
			})
	})

	it('with input < 1', () => {
		cy.react('CartDetail')
			.react('TextField')
			.find('input')
			.eq(0)
			.clear()
			.type(-1)
			.should('have.value', '-1')
			.blur()
		cy.react('CartDetail')
			.react('TextField')
			.find('input')
			.eq(0)
			.should('have.value', 1)
	})

	it('with input = 1', () => {
		cy.react('CartDetail')
			.react('TextField')
			.find('input')
			.eq(0)
			.clear()
			.type(1)
			.should('have.value', 1)
			.blur()
		cy.react('CartDetail')
			.react('TextField')
			.find('input')
			.eq(0)
			.should('have.value', 1)
	})

	it('with input 1 <= x <= productQuantity', () => {
		const x = Math.floor(Math.random() * sampleCart[0].quantity) + 1;
		cy.react('CartDetail')
			.react('TextField')
			.find('input')
			.eq(0)
			.clear()
			.type(x)
			.should('have.value', x)
			.blur()
		cy.react('CartDetail')
			.react('TextField')
			.find('input')
			.eq(0)
			.should('have.value', x)
	})

	it('with input x > productQuantity', () => {
		const x = 101;
		cy.react('CartDetail')
			.react('TextField')
			.find('input')
			.eq(0)
			.clear()
			.type(x)
			.should('have.value', x)
			.blur()
		cy.wait(1000)
		cy.react('CartDetail')
			.react('TextField')
			.find('input')
			.eq(0)
			.should('have.value', 100)
	})

	it('with input x > 999999999', () => {
		const x = 1000000000;
		cy.react('CartDetail')
			.react('TextField')
			.find('input')
			.eq(0)
			.clear()
			.type(x)
			.should('have.value', 999999999)
	})
})
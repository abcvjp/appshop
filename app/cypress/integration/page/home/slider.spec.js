import { SAMPLE_SLIDER as sampleSlider } from '../../../constants';

describe('home page: slider', () => {
	before(() => {
		cy.visit('/');
		cy.waitForReact();
	})
	it('slider is visible', () => {
		cy.react('HomeSlider').get('div[id="home-slider"]')
			.should('be.visible')
		cy.getReact('HomeSlider').then(slider => {
			cy.wrap(slider).getProps('slides.length').should('eq', sampleSlider.length)
		})
	})

	it('slider can be next, prev', () => {
		for (let i=0; i<sampleSlider.length; i++) {
			cy.react('HomeSlider')
				.find('img')
				.should('have.attr', 'src', sampleSlider[i].imgUrl)
			cy.react('HomeSlider')
				.react('IconButton')
				.eq(1)
				.click()
				.wait(400)
		}
	})

	it('slide link can navigate', () => {
		for (let i=0; i<sampleSlider.length-1; i++) {
			for (let j=0; j<=i; j++) {
				cy.react('HomeSlider')
					.react('IconButton')
					.eq(1)
					.click()
					.wait(400)
			}
			cy.react('HomeSlider')
				.find('img')
				.click()
			cy.location('pathname').should('eq', sampleSlider[i].url)
			cy.go('back')
		}
	})
})
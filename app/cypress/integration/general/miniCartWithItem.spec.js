import { CART_PAGE_PATH, SAMPLE_CART_DATA, SAMPLE_CART_DATA_2 } from '../../constants';

const sampleCart = JSON.parse(SAMPLE_CART_DATA);
const sampleCartItemCount = sampleCart.reduce(
  (accumul, cur) => accumul + cur.quantity,
  0
);

describe('mini cart with item', () => {
  describe('mini cart with item: in home', () => {
		beforeEach(() => {
			cy.gotoHomeWithCart();
		})
		it('cart show and show correct info', () => {
			cy.react('MiniCart')
				.should('be.visible')
        .getReact('IconButton')
        .getReact('Badge')
        .getProps('badgeContent')
        // item count
        .should('eq', sampleCartItemCount);
      // cart item
			cy.react('MiniCart').trigger('mouseover')
        .react('MiniCartDetail')
				.find('div[id="mini-cart-item"]')
				.should('have.length', sampleCart.length)
				.each((item, index) => {
					cy.wrap(item)
					// check item name
					.should('contain', sampleCart[index].product_name)
					// check price and qty
					.should('contain',`${sampleCart[index].price}$ - Qty: ${sampleCart[index].quantity}`)
					// check avatar
					.getReact('Avatar').getProps('src')
					.should('eq', sampleCart[index].product_thumbnail.url)
				})
			cy.react('MiniCart').trigger('mouseout')
		})

		it('navigate to cart page after click cart icon', () => {
			cy.react('MiniCart').react('IconButton').click();
			cy.location('pathname').should('eq', CART_PAGE_PATH);
		})

		it('delete 1 item in cart', () => {
			// random item to delete
			const sampleItem = sampleCart[Math.floor(Math.random()*sampleCart.length)];
			// click delete icon
			cy.react('MiniCart').trigger('mouseover')
				.react('MiniCartDetail')
				.react('MiniCartItem', {props: {item: { product_id: sampleItem.product_id}}})
				.find('button').click()
			// check confim dialog
			cy.react('ConfirmDialog')
			.react('DialogContent')
			.should('contain', "Are you sure want to delete item from your cart?")
			// click confirm delete
			cy.react('ConfirmDialog').react('Button').eq(1).click()
			// check if delete success
			if (sampleCart.length > 1) {
				cy.react('MiniCart').trigger('mouseover')
					.react('MiniCartDetail')
					.find('div[id="mini-cart-item"]')
					.should('have.length', sampleCart.length-1)
					.each((item) => {
						cy.wrap(item)
						.should('not.contain', sampleItem.product_name)
					})
			} else {
				cy.react('MiniCart').trigger('mouseover')
					.react('MiniCartDetail').should('not.exist')
				cy.react('MiniCart').react('Typography').should('contain', 'Your cart is current empty')
			}
		});

		it('delete all item in cart', () => {
			const cart = [...sampleCart];
			while (cart.length > 0) {
				// random item to delete
				const sampleItemIndex = Math.floor(Math.random()*cart.length);
				const sampleItem = cart[sampleItemIndex];
				// click delete icon
				cy.react('MiniCart').trigger('mouseover')
					.react('MiniCartDetail')
					.react('MiniCartItem', {props: {item: { product_id: sampleItem.product_id}}})
					.find('button').click()
				// check confim dialog
				cy.react('ConfirmDialog')
				.react('DialogContent')
				.should('contain', "Are you sure want to delete item from your cart?")
				// click confirm delete
				cy.react('ConfirmDialog').react('Button').eq(1).click()
				// check if delete success
				if (cart.length > 1) {
					cy.react('MiniCart').trigger('mouseover')
						.react('MiniCartDetail')
						.find('div[id="mini-cart-item"]')
						.should('have.length', sampleCart.length-1)
						.each((item) => {
							cy.wrap(item)
							.should('not.contain', sampleItem.product_name)
						})
				} else {
					cy.react('MiniCart').trigger('mouseover')
						.react('MiniCartDetail').should('not.exist')
					cy.react('MiniCart').react('Typography').should('contain', 'Your cart is current empty')
				}
				cart.splice(sampleItemIndex,1);
			}
		});

		it('"view cart and checkout" button work', () => {
			cy.react('MiniCart').trigger('mouseover')
				// .react('ContainedButton')
				.react('Button', { props: { href: "/cart" } })
				.click()
			cy.location('pathname').should('eq', CART_PAGE_PATH);
		})
  });

	describe('mini cart with item: in product page', () => {
		beforeEach(() => {
			cy.gotoSampleProductWithCart();
		})
		it('cart show and show correct info', () => {
			cy.react('MiniCart')
				.should('be.visible')
        .getReact('IconButton')
        .getReact('Badge')
        .getProps('badgeContent')
        // item count
        .should('eq', sampleCartItemCount);
      // cart item
			cy.react('MiniCart').trigger('mouseover')
        .react('MiniCartDetail')
				.find('div[id="mini-cart-item"]')
				.should('have.length', sampleCart.length)
				.each((item, index) => {
					cy.wrap(item)
					// check item name
					.should('contain', sampleCart[index].product_name)
					// check price and qty
					.should('contain',`${sampleCart[index].price}$ - Qty: ${sampleCart[index].quantity}`)
					// check avatar
					.getReact('Avatar').getProps('src')
					.should('eq', sampleCart[index].product_thumbnail.url)
				})
			cy.react('MiniCart').trigger('mouseout')
		})

		it('navigate to cart page after click cart icon', () => {
			cy.react('MiniCart').react('IconButton').click();
			cy.location('pathname').should('eq', CART_PAGE_PATH);
		})

		it('delete 1 item in cart', () => {
			// random item to delete
			const sampleItem = sampleCart[Math.floor(Math.random()*sampleCart.length)];
			// click delete icon
			cy.react('MiniCart').trigger('mouseover')
				.react('MiniCartDetail')
				.react('MiniCartItem', {props: {item: { product_id: sampleItem.product_id}}})
				.find('button').click()
			// check confim dialog
			cy.react('ConfirmDialog')
			.react('DialogContent')
			.should('contain', "Are you sure want to delete item from your cart?")
			// click confirm delete
			cy.react('ConfirmDialog').react('Button').eq(1).click()
			// check if delete success
			if (sampleCart.length > 1) {
				cy.react('MiniCart').trigger('mouseover')
					.react('MiniCartDetail')
					.find('div[id="mini-cart-item"]')
					.should('have.length', sampleCart.length-1)
					.each((item) => {
						cy.wrap(item)
						.should('not.contain', sampleItem.product_name)
					})
			} else {
				cy.react('MiniCart').trigger('mouseover')
					.react('MiniCartDetail').should('not.exist')
				cy.react('MiniCart').react('Typography').should('contain', 'Your cart is current empty')
			}
		});

		it('delete all item in cart', () => {
			const cart = [...sampleCart];
			while (cart.length > 0) {
				// random item to delete
				const sampleItemIndex = Math.floor(Math.random()*cart.length);
				const sampleItem = cart[sampleItemIndex];
				// click delete icon
				cy.react('MiniCart').trigger('mouseover')
					.react('MiniCartDetail')
					.react('MiniCartItem', {props: {item: { product_id: sampleItem.product_id}}})
					.find('button').click()
				// check confim dialog
				cy.react('ConfirmDialog')
				.react('DialogContent')
				.should('contain', "Are you sure want to delete item from your cart?")
				// click confirm delete
				cy.react('ConfirmDialog').react('Button').eq(1).click()
				// check if delete success
				if (cart.length > 1) {
					cy.react('MiniCart').trigger('mouseover')
						.react('MiniCartDetail')
						.find('div[id="mini-cart-item"]')
						.should('have.length', sampleCart.length-1)
						.each((item) => {
							cy.wrap(item)
							.should('not.contain', sampleItem.product_name)
						})
				} else {
					cy.react('MiniCart').trigger('mouseover')
						.react('MiniCartDetail').should('not.exist')
					cy.react('MiniCart').react('Typography').should('contain', 'Your cart is current empty')
				}
				cart.splice(sampleItemIndex,1);
			}
		});

		it('"view cart and checkout" button work', () => {
			cy.react('MiniCart').trigger('mouseover')
				// .react('ContainedButton')
				.react('Button', { props: { href: "/cart" } })
				.click()
			cy.location('pathname').should('eq', CART_PAGE_PATH);
		})
  });

	describe('mini cart with item: in category page', () => {
		beforeEach(() => {
			cy.gotoSampleCategoryWithCart();
		})
		it('cart show and show correct info', () => {
			cy.react('MiniCart')
				.should('be.visible')
        .getReact('IconButton')
        .getReact('Badge')
        .getProps('badgeContent')
        // item count
        .should('eq', sampleCartItemCount);
      // cart item
			cy.react('MiniCart').trigger('mouseover')
        .react('MiniCartDetail')
				.find('div[id="mini-cart-item"]')
				.should('have.length', sampleCart.length)
				.each((item, index) => {
					cy.wrap(item)
					// check item name
					.should('contain', sampleCart[index].product_name)
					// check price and qty
					.should('contain',`${sampleCart[index].price}$ - Qty: ${sampleCart[index].quantity}`)
					// check avatar
					.getReact('Avatar').getProps('src')
					.should('eq', sampleCart[index].product_thumbnail.url)
				})
			cy.react('MiniCart').trigger('mouseout')
		})

		it('navigate to cart page after click cart icon', () => {
			cy.react('MiniCart').react('IconButton').click();
			cy.location('pathname').should('eq', CART_PAGE_PATH);
		})

		it('delete 1 item in cart', () => {
			// random item to delete
			const sampleItem = sampleCart[Math.floor(Math.random()*sampleCart.length)];
			// click delete icon
			cy.react('MiniCart').trigger('mouseover')
				.react('MiniCartDetail')
				.react('MiniCartItem', {props: {item: { product_id: sampleItem.product_id}}})
				.find('button').click()
			// check confim dialog
			cy.react('ConfirmDialog')
			.react('DialogContent')
			.should('contain', "Are you sure want to delete item from your cart?")
			// click confirm delete
			cy.react('ConfirmDialog').react('Button').eq(1).click()
			// check if delete success
			if (sampleCart.length > 1) {
				cy.react('MiniCart').trigger('mouseover')
					.react('MiniCartDetail')
					.find('div[id="mini-cart-item"]')
					.should('have.length', sampleCart.length-1)
					.each((item) => {
						cy.wrap(item)
						.should('not.contain', sampleItem.product_name)
					})
			} else {
				cy.react('MiniCart').trigger('mouseover')
					.react('MiniCartDetail').should('not.exist')
				cy.react('MiniCart').react('Typography').should('contain', 'Your cart is current empty')
			}
		});

		it('delete all item in cart', () => {
			const cart = [...sampleCart];
			while (cart.length > 0) {
				// random item to delete
				const sampleItemIndex = Math.floor(Math.random()*cart.length);
				const sampleItem = cart[sampleItemIndex];
				// click delete icon
				cy.react('MiniCart').trigger('mouseover')
					.react('MiniCartDetail')
					.react('MiniCartItem', {props: {item: { product_id: sampleItem.product_id}}})
					.find('button').click()
				// check confim dialog
				cy.react('ConfirmDialog')
				.react('DialogContent')
				.should('contain', "Are you sure want to delete item from your cart?")
				// click confirm delete
				cy.react('ConfirmDialog').react('Button').eq(1).click()
				// check if delete success
				if (cart.length > 1) {
					cy.react('MiniCart').trigger('mouseover')
						.react('MiniCartDetail')
						.find('div[id="mini-cart-item"]')
						.should('have.length', sampleCart.length-1)
						.each((item) => {
							cy.wrap(item)
							.should('not.contain', sampleItem.product_name)
						})
				} else {
					cy.react('MiniCart').trigger('mouseover')
						.react('MiniCartDetail').should('not.exist')
					cy.react('MiniCart').react('Typography').should('contain', 'Your cart is current empty')
				}
				cart.splice(sampleItemIndex,1);
			}
		});

		it('"view cart and checkout" button work', () => {
			cy.react('MiniCart').trigger('mouseover')
				// .react('ContainedButton')
				.react('Button', { props: { href: "/cart" } })
				.click()
			cy.location('pathname').should('eq', CART_PAGE_PATH);
		})
  });

	describe('mini cart with item: in search page', () => {
		beforeEach(() => {
			cy.gotoSampleSearchWithCart();
		})
		it('cart show and show correct info', () => {
			cy.react('MiniCart')
				.should('be.visible')
        .getReact('IconButton')
        .getReact('Badge')
        .getProps('badgeContent')
        // item count
        .should('eq', sampleCartItemCount);
      // cart item
			cy.react('MiniCart').trigger('mouseover')
        .react('MiniCartDetail')
				.find('div[id="mini-cart-item"]')
				.should('have.length', sampleCart.length)
				.each((item, index) => {
					cy.wrap(item)
					// check item name
					.should('contain', sampleCart[index].product_name)
					// check price and qty
					.should('contain',`${sampleCart[index].price}$ - Qty: ${sampleCart[index].quantity}`)
					// check avatar
					.getReact('Avatar').getProps('src')
					.should('eq', sampleCart[index].product_thumbnail.url)
				})
			cy.react('MiniCart').trigger('mouseout')
		})

		it('navigate to cart page after click cart icon', () => {
			cy.react('MiniCart').react('IconButton').click();
			cy.location('pathname').should('eq', CART_PAGE_PATH);
		})

		it('delete 1 item in cart', () => {
			// random item to delete
			const sampleItem = sampleCart[Math.floor(Math.random()*sampleCart.length)];
			// click delete icon
			cy.react('MiniCart').trigger('mouseover')
				.react('MiniCartDetail')
				.react('MiniCartItem', {props: {item: { product_id: sampleItem.product_id}}})
				.find('button').click()
			// check confim dialog
			cy.react('ConfirmDialog')
			.react('DialogContent')
			.should('contain', "Are you sure want to delete item from your cart?")
			// click confirm delete
			cy.react('ConfirmDialog').react('Button').eq(1).click()
			// check if delete success
			if (sampleCart.length > 1) {
				cy.react('MiniCart').trigger('mouseover')
					.react('MiniCartDetail')
					.find('div[id="mini-cart-item"]')
					.should('have.length', sampleCart.length-1)
					.each((item) => {
						cy.wrap(item)
						.should('not.contain', sampleItem.product_name)
					})
			} else {
				cy.react('MiniCart').trigger('mouseover')
					.react('MiniCartDetail').should('not.exist')
				cy.react('MiniCart').react('Typography').should('contain', 'Your cart is current empty')
			}
		});

		it('delete all item in cart', () => {
			const cart = [...sampleCart];
			while (cart.length > 0) {
				// random item to delete
				const sampleItemIndex = Math.floor(Math.random()*cart.length);
				const sampleItem = cart[sampleItemIndex];
				// click delete icon
				cy.react('MiniCart').trigger('mouseover')
					.react('MiniCartDetail')
					.react('MiniCartItem', {props: {item: { product_id: sampleItem.product_id}}})
					.find('button').click()
				// check confim dialog
				cy.react('ConfirmDialog')
				.react('DialogContent')
				.should('contain', "Are you sure want to delete item from your cart?")
				// click confirm delete
				cy.react('ConfirmDialog').react('Button').eq(1).click()
				// check if delete success
				if (cart.length > 1) {
					cy.react('MiniCart').trigger('mouseover')
						.react('MiniCartDetail')
						.find('div[id="mini-cart-item"]')
						.should('have.length', sampleCart.length-1)
						.each((item) => {
							cy.wrap(item)
							.should('not.contain', sampleItem.product_name)
						})
				} else {
					cy.react('MiniCart').trigger('mouseover')
						.react('MiniCartDetail').should('not.exist')
					cy.react('MiniCart').react('Typography').should('contain', 'Your cart is current empty')
				}
				cart.splice(sampleItemIndex,1);
			}
		});

		it('"view cart and checkout" button work', () => {
			cy.react('MiniCart').trigger('mouseover')
				// .react('ContainedButton')
				.react('Button', { props: { href: "/cart" } })
				.click()
			cy.location('pathname').should('eq', CART_PAGE_PATH);
		})
  });

	describe('mini cart with item: in cart page', () => {
		beforeEach(() => {
			cy.gotoCartWithCart();
		})
		it('cart show and show correct info', () => {
			cy.react('MiniCart')
				.should('be.visible')
        .getReact('IconButton')
        .getReact('Badge')
        .getProps('badgeContent')
        // item count
        .should('eq', sampleCartItemCount);
      // cart item
			cy.react('MiniCart').trigger('mouseover')
        .react('MiniCartDetail')
				.find('div[id="mini-cart-item"]')
				.should('have.length', sampleCart.length)
				.each((item, index) => {
					cy.wrap(item)
					// check item name
					.should('contain', sampleCart[index].product_name)
					// check price and qty
					.should('contain',`${sampleCart[index].price}$ - Qty: ${sampleCart[index].quantity}`)
					// check avatar
					.getReact('Avatar').getProps('src')
					.should('eq', sampleCart[index].product_thumbnail.url)
				})
			cy.react('MiniCart').trigger('mouseout')
		})

		it('navigate to cart page after click cart icon', () => {
			cy.react('MiniCart').react('IconButton').click();
			cy.location('pathname').should('eq', CART_PAGE_PATH);
		})

		it('delete 1 item in cart', () => {
			// random item to delete
			const sampleItem = sampleCart[Math.floor(Math.random()*sampleCart.length)];
			// click delete icon
			cy.react('MiniCart').trigger('mouseover')
				.react('MiniCartDetail')
				.react('MiniCartItem', {props: {item: { product_id: sampleItem.product_id}}})
				.find('button').click()
			// check confim dialog
			cy.react('ConfirmDialog')
			.react('DialogContent')
			.should('contain', "Are you sure want to delete item from your cart?")
			// click confirm delete
			cy.react('ConfirmDialog').react('Button').eq(1).click()
			// check if delete success
			if (sampleCart.length > 1) {
				cy.react('MiniCart').trigger('mouseover')
					.react('MiniCartDetail')
					.find('div[id="mini-cart-item"]')
					.should('have.length', sampleCart.length-1)
					.each((item) => {
						cy.wrap(item)
						.should('not.contain', sampleItem.product_name)
					})
			} else {
				cy.react('MiniCart').trigger('mouseover')
					.react('MiniCartDetail').should('not.exist')
				cy.react('MiniCart').react('Typography').should('contain', 'Your cart is current empty')
			}
		});

		it('delete all item in cart', () => {
			const cart = [...sampleCart];
			while (cart.length > 0) {
				// random item to delete
				const sampleItemIndex = Math.floor(Math.random()*cart.length);
				const sampleItem = cart[sampleItemIndex];
				// click delete icon
				cy.react('MiniCart').trigger('mouseover')
					.react('MiniCartDetail')
					.react('MiniCartItem', {props: {item: { product_id: sampleItem.product_id}}})
					.find('button').click()
				// check confim dialog
				cy.react('ConfirmDialog')
				.react('DialogContent')
				.should('contain', "Are you sure want to delete item from your cart?")
				// click confirm delete
				cy.react('ConfirmDialog').react('Button').eq(1).click()
				// check if delete success
				if (cart.length > 1) {
					cy.react('MiniCart').trigger('mouseover')
						.react('MiniCartDetail')
						.find('div[id="mini-cart-item"]')
						.should('have.length', sampleCart.length-1)
						.each((item) => {
							cy.wrap(item)
							.should('not.contain', sampleItem.product_name)
						})
				} else {
					cy.react('MiniCart').trigger('mouseover')
						.react('MiniCartDetail').should('not.exist')
					cy.react('MiniCart').react('Typography').should('contain', 'Your cart is current empty')
				}
				cart.splice(sampleItemIndex,1);
			}
		});

		it('"view cart and checkout" button work', () => {
			cy.react('MiniCart').trigger('mouseover')
				// .react('ContainedButton')
				.react('Button', { props: { href: "/cart" } })
				.click()
			cy.location('pathname').should('eq', CART_PAGE_PATH);
		})
  });
});

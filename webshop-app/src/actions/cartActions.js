import { ADD_TO_CART, DELETE_CART, UPDATE_CART } from "../constants/actionTypes"
import { DELETE_ITEM_CART } from "../constants/actionTypes"
import { CHANGE_QUANTITY_ITEM_CART } from "../constants/actionTypes"
import { SET_CART } from "../constants/actionTypes"
import { showAlertMessage } from "./alertMessageActions"

import API from "../utils/apiClient"

export const setCart = ({ cart }) => ({
	type: SET_CART,
	payload: { cart }
})

export const addToCart = ({ product_id, product_name, product_slug, product_thumbnail, price, quantity, buy_able }) => ({
	type: ADD_TO_CART,
	payload: {
		item: { product_id, product_name, product_slug, product_thumbnail, price, quantity, buy_able }
	}
})

export const deleteItemCart = ({ itemIndex }) => ({
	type: DELETE_ITEM_CART,
	payload: { itemIndex }
})

export const changeQuantityItemCart = ({ itemIndex, quantity }) => ({
	type: CHANGE_QUANTITY_ITEM_CART,
	payload: { itemIndex, quantity }
})

export const deleteCart = () => ({
	type: DELETE_CART,
	payload: null
})

export const updateCart = ({ items }) => ({
	type: UPDATE_CART,
	payload: { items }
})

export const checkAndAddToCart = ({ product_id, product_name, price, quantity }) => async (dispatch, getState) => {
	API.get(`/product/${product_id}`).then(response => response.data.data).then(productFromServer => {
		if (productFromServer.disabled === true) {
			dispatch(showAlertMessage({ type: 'error', content: 'This product has been disabled' }))
		} else if (productFromServer.quantity === 0) {
			dispatch(showAlertMessage({ type: 'error', content: 'This product has sold out' }))
		} else if (productFromServer.quantity < quantity) {
			dispatch(showAlertMessage({ type: 'error', content: 'Quantity of this product is not enough' }))
		} else if (productFromServer.price !== price || productFromServer.name !== product_name) {
			dispatch(addToCart({
				product_id,
				product_name: productFromServer.name,
				product_slug: productFromServer.slug,
				product_thumbnail: productFromServer.images[0],
				price: productFromServer.price,
				quantity,
				buy_able: true
			}))
			dispatch(showAlertMessage({ type: 'warning', content: 'Added successfully. But product info has been changed, you should check again' }))
		} else {
			dispatch(addToCart({
				product_id,
				product_name: productFromServer.name,
				product_slug: productFromServer.slug,
				product_thumbnail: productFromServer.images[0],
				price: productFromServer.price,
				quantity,
				buy_able: true
			}))
			dispatch(showAlertMessage({ type: 'success', content: 'Added successfully' }))
		}
	}).catch(err => {
		showAlertMessage({ type: 'error', content: 'Something wrong happend' })
	})
}

export const checkAndChangeQuantity = ({ itemIndex, quantity }) => async (dispatch, getState) => {
	if (quantity < 1) {
		dispatch(showAlertMessage({ type: 'error', content: `Product quantity cann't be lower than 1` }))
		dispatch(changeQuantityItemCart({ itemIndex, quantity: 1 }))
	} else {
		const cart_item = getState().cart[itemIndex]
		console.log(cart_item)
		API.get(`/product/${cart_item.product_id}`).then(response => response.data.data).then(productFromServer => {
			if (productFromServer.quantity === 0) {
				dispatch(showAlertMessage({ type: 'error', content: 'This product has sold out' }))
			} else if (productFromServer.quantity < quantity) {
				dispatch(showAlertMessage({ type: 'error', content: `You only can buy up to ${productFromServer.quantity} products of ${cart_item.product_name}` }))
				dispatch(changeQuantityItemCart({ itemIndex, quantity: productFromServer.quantity }))
			} else {
				dispatch(changeQuantityItemCart({ itemIndex, quantity }))
			}
		}).catch(err => {
			showAlertMessage({ type: 'error', content: 'Something wrong happend' })
		})
	}
}

export const checkAndValidCart = async (dispatch, getState) => {
	API.get(`/cart/check_valid`).then(response => response.data).then(response => {
		if (response.success === true) {

		}
	})
}
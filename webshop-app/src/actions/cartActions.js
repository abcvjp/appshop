import { ADD_TO_CART } from "../constants/actionTypes"
import { DELETE_ITEM_CART } from "../constants/actionTypes"
import { CHANGE_QUANTITY_ITEM_CART } from "../constants/actionTypes"

export const addToCart = ({ product }) => ({
	type: ADD_TO_CART,
	payload: { product }
})

export const deleteItemCart = ({ itemIndex }) => ({
	type: DELETE_ITEM_CART,
	payload: { itemIndex }
})

export const changeQuantityItemCart = ({ itemIndex, quantity }) => ({
	type: CHANGE_QUANTITY_ITEM_CART,
	payload: { itemIndex, quantity }
})
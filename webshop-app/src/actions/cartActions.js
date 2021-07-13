import { ADD_TO_CART } from "../constants/actionTypes"
import { DELETE_ITEM_CART } from "../constants/actionTypes"
import { CHANGE_QUANTITY_ITEM_CART } from "../constants/actionTypes"

export const addToCart = (product) => ({
	type: ADD_TO_CART,
	payload: product
})

export const deleteItemCart = ({ id }) => ({
	type: DELETE_ITEM_CART,
	payload: { id: id }
})

export const changeQuantityItemCart = ({ id, quantity }) => ({
	type: CHANGE_QUANTITY_ITEM_CART,
	payload: { id, quantity }
})
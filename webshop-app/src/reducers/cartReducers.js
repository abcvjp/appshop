import { DELETE_ITEM_CART } from "../constants/actionTypes"
import { ADD_TO_CART } from "../constants/actionTypes"
import { CHANGE_QUANTITY_ITEM_CART } from "../constants/actionTypes"
import { isArrayEmpty } from "../utils/utilFuncs"

const initialState = []

export default function cartReducer(state = initialState, action) {
	const cart_items = [...state]
	switch (action.type) {
		case ADD_TO_CART:
			const productToAdd = action.payload.product
			const isProductContained = () => cart_items.some((item) => item.product.id === productToAdd.id)
			if (isArrayEmpty(cart_items) || !isProductContained()) {
				cart_items.push({
					product: productToAdd,
					quantity: 1
				})
			} else {
				const item = cart_items.find((item) => item.product.id === productToAdd.id)
				if (item) {
					item.quantity += 1
				}
			}
			return cart_items
		case DELETE_ITEM_CART:
			const iIndex = action.payload.itemIndex
			return cart_items.filter((item, index) => { return index !== iIndex })
		case CHANGE_QUANTITY_ITEM_CART:
			const { itemIndex, quantity } = action.payload
			if (quantity < 1 || quantity > cart_items[itemIndex].product.quantity) {
				return cart_items
			}
			cart_items[itemIndex].quantity = quantity
			return cart_items
		default:
			return state
	}
}
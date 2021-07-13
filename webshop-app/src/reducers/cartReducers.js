import { DELETE_ITEM_CART } from "../constants/actionTypes"
import { ADD_TO_CART } from "../constants/actionTypes"
import { CHANGE_QUANTITY_ITEM_CART } from "../constants/actionTypes"

const initialState = []

export default function cartReducers(state = initialState, action) {
	switch (action.type) {
		case ADD_TO_CART:
			const items = [...state]
			const isProductContained = items.some((product) => product.id === action.payload.id)
			if (items === undefined || !isProductContained) {
				items.push({
					quantity: 1,
					...action.payload
				})
			} else {
				const product = items.find((product) => product.id === action.payload.id)
				if (product) {
					product.quantity += 1
				}
			}
			return items
		case DELETE_ITEM_CART:
			return state.filter((item) => item.id !== action.payload.id)
		case CHANGE_QUANTITY_ITEM_CART:
			if (action.payload.quantity > 0) {
				return state.map((item) => (item.id === action.payload.id ?
					{ ...item, quantity: parseInt(action.payload.quantity) } : item))
			} else {
				return state
			}
		default:
			return state
	}
}
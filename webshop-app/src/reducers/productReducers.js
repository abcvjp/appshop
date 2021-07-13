import { FETCH_PRODUCTS } from "../constants/actionTypes"

const initialState = {
	products: []
}

export default function productReducers(state = initialState, action) {
	switch (action.type) {
		case FETCH_PRODUCTS:
			return {
				...state,
				products: action.payload
			}
		default:
			return state
	}
}
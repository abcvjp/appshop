import { createStore } from "redux"
import rootReducer from './reducers'
import PRODUCTS_DATA from "./constants/products"

const initialState = {
	cart: [],
	products: PRODUCTS_DATA,
	ui: {
		message: {
			isShown: false,
			type: null,
			content: null
		}
	}
}

const store = createStore(rootReducer, initialState)

export default store
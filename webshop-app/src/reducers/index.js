import { combineReducers } from "redux"
import productReducers from "./productReducers"
import cartReducers from "./cartReducers"
import messageReducers from "./messageReducer"

export default combineReducers({
	products: productReducers,
	cart: cartReducers,
	ui: combineReducers({
		message: messageReducers
	})
})
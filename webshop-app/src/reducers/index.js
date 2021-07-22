import { combineReducers } from "redux"
import cartReducer from "./cartReducers"
import alertMessageReducer from "./alertMessageReducer"
import categoryReducer from "./categoryReducer"
import breadcrumbsReducer from "./breadcrumbsReducer"

export default combineReducers({
	categories: categoryReducer,
	cart: cartReducer,
	ui: combineReducers({
		alertMessage: alertMessageReducer,
		breadcrumbs: breadcrumbsReducer
	})
})
import { createStore } from "redux"
import rootReducer from './reducers'

const initialState = {
	cart: [],
	categories: {
		list_all: [],
		all: {},
		tree: [],
		map_slug_id: {},
		map_name_slug: {},
		map_name_id: {}
	},
	ui: {
		alertMessage: {
			isShown: false,
			type: null,
			content: null
		},
		breadcrumbs: []
	}
}

const store = createStore(rootReducer, initialState)

export default store
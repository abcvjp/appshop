import { SET_BREADCRUMBS } from "../constants/actionTypes"
import { SET_BREADCRUMBS_BY_STRING } from "../constants/actionTypes"

const initialState = []

export default function breadcrumbsReducer(state = initialState, action) {
	switch (action.type) {
		case SET_BREADCRUMBS:
			console.log(action.breadcrumbs)
			return action.breadcrumbs
		case SET_BREADCRUMBS_BY_STRING:
			return state
		default:
			return state
	}
}


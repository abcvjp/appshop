import { SHOW_MESSAGE } from "../constants/actionTypes"
import { CLOSE_MESSAGE } from "../constants/actionTypes"

const initialState = {
	message: {
		isShown: false,
		type: null,
		content: null
	}
}

export default function messageReducers(state = initialState, action) {
	switch (action.type) {
		case SHOW_MESSAGE:
			return {
				isShown: true,
				type: action.payload.type,
				content: action.payload.content
			}
		case CLOSE_MESSAGE:
			return initialState
		default:
			return state
	}
}
import { SHOW_MESSAGE } from "../constants/actionTypes"
import { CLOSE_MESSAGE } from "../constants/actionTypes"

export const showMessage = ({ type, content }) => ({
	type: SHOW_MESSAGE,
	payload: {
		type, content
	}
})

export const closeMessage = () => ({
	type: CLOSE_MESSAGE
})
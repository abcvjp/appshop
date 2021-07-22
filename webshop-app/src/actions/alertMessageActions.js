import { SHOW_ALERT_MESSAGE } from "../constants/actionTypes"
import { CLOSE_ALERT_MESSAGE } from "../constants/actionTypes"

export const showAlertMessage = ({ type, content }) => ({
	type: SHOW_ALERT_MESSAGE,
	payload: {
		type, content
	}
})

export const closeAlertMessage = () => ({
	type: CLOSE_ALERT_MESSAGE
})
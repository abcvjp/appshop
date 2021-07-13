import React from 'react'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { closeMessage } from '../actions/messageActions'

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertMessage = () => {
	const message = useSelector(state => state.ui.message)
	const dispatch = useDispatch()
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		dispatch(closeMessage())
	};
	return (
		<Snackbar open={message.isShown} autoHideDuration={3000}
			onClose={handleClose}>
			<Alert onClose={handleClose} severity={message.type}>
				{message.content}
			</Alert>
		</Snackbar>
	)
}

export default AlertMessage

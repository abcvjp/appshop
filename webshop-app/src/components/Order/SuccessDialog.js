import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, Button } from '@material-ui/core'
import { useHistory } from 'react-router'

const SuccessDialog = ({ order }) => {
	const history = useHistory()
	const handleSuccessDialogClose = () => {
		history.push('/')
	}
	return (
		<Dialog open={true}>
			<DialogContent>
				<DialogContentText style={{ fontWeight: 'bold', color: 'green' }}>Ordered successfully</DialogContentText>
				<DialogContentText>Your order id is {order.id}. We'll email you an order confirmation with details and tracking info.</DialogContentText>
				<DialogActions>
					<Button onClick={handleSuccessDialogClose} color="secondary" size="large" variant="contained" >
						CONTINUE SHOPPING
					</Button>
				</DialogActions>
			</DialogContent>
		</Dialog>
	)
}

export default SuccessDialog

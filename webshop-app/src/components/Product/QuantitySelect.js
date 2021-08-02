import React from 'react'
import { makeStyles, TextField } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(1)
	},
	qty: {
		maxWidth: theme.spacing(12),
		"& .MuiFormLabel-root": {
			color: "black" // or black
		}
	},

}))

const QuantitySelect = ({ qty, handleQtyChange }) => {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<TextField className={classes.qty} type="Number" variant="outlined" label="Quantity"
				value={qty}
				onChange={handleQtyChange}
			/>
		</div>
	)
}

export default QuantitySelect

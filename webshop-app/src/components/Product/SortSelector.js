import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import NativeSelect from '@material-ui/core/NativeSelect'
import InputBase from '@material-ui/core/InputBase'
import { Typography } from '@material-ui/core'

const BootstrapInput = withStyles((theme) => ({
	root: {
		'label + &': {
			marginTop: theme.spacing(3),
		},
	},
	input: {
		borderRadius: 4,
		position: 'relative',
		backgroundColor: theme.palette.background.paper,
		border: '1px solid #ced4da',
		fontSize: 16,
		padding: '10px 26px 10px 12px',
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(',')
	},
}))(InputBase);

const useStyles = makeStyles((theme) => ({
	justify: {
		justifySelf: "end",
		display: "inline-flex",
		alignItems: "center"
	},
	typo: {
		marginRight: theme.spacing(1)
	}
}))

export default function SortSelector({ sortBy, handleSortChange }) {
	const classes = useStyles()
	return (
		<div className={classes.justify}>
			<Typography className={classes.typo}>Sort by</Typography>
			<NativeSelect
				variant="standard"
				value={sortBy}
				onChange={handleSortChange}
				input={<BootstrapInput />}
			>
				<option value='createdAt.desc'>New</option>
				<option value='price.asc'>Price (Low to High)</option>
				<option value='price.desc'>Price (High to Low)</option>
				<option value='createdAt.asc'>Discount</option>
				<option value='sold.desc'>Best Selling</option>
			</NativeSelect>
		</div>
	)
}
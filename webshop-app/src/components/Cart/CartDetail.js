import React from 'react'
import { Checkbox, Divider, Grid, IconButton, makeStyles, Paper } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
	root: {

	},
	itemsHeaderLeft: {
		flexGrow: 1,
		justifyContent: 'flex-start',
		alignItems: "center"
	},
	itemsHeaderRight: {
		alignItems: 'center',
		justifyContent: 'flex-end',
		flexWrap: "nowrap",
	},
	rightItem: {
		width: '25%',
		display: 'flex',
		justifyContent: 'center'
	},
	itemsHeader: {
		justifyContent: "space-between",
		alignItems: "center",
		fontWeight: "bold",
		flexWrap: "nowrap",
		[theme.breakpoints.down('xs')]: {
			flexWrap: "wrap"
		}
	},
	margin: {
		margin: theme.spacing(1)
	},
	delete: {
		color: 'grey'
	}
}))

const CartDetail = ({ cartItems, isSelectedAll, handleSelectedAllChange, handleDeleteAllConfirmOpen }) => {
	const classes = useStyles()

	return (
		<Paper elevation={0}>
			<Grid key="header" className={classes.itemsHeader} container>
				<Grid key="item" className={`${classes.margin} ${classes.itemsHeaderLeft}`} item container sm={7} spacing={3}>
					<Checkbox disableRipple
						checked={isSelectedAll}
						onChange={handleSelectedAllChange}
					/>
					{`All (${cartItems.length} items)`}
				</Grid>
				<Grid key="other" className={`${classes.margin} ${classes.itemsHeaderRight}`} item container sm={5}>
					<Grid item key="price" className={classes.rightItem}>Price</Grid>
					<Grid item key="quantity" className={classes.rightItem}>Qty</Grid>
					<Grid item key="subtotal" className={classes.rightItem}>Subtotal</Grid>
					<Grid item key="delete" className={classes.rightItem}>
						<IconButton className={classes.delete} disableFocusRipple disableRipple
							onClick={handleDeleteAllConfirmOpen}
						>
							<Delete />
						</IconButton>
					</Grid>
				</Grid>
			</Grid>
			{cartItems.map((item, index) =>
				<div key={`item ${index + 1}`}>
					<Divider variant="middle" />
					{item}
				</div>)}


		</Paper>
	)
}

export default CartDetail
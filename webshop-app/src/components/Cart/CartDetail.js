import React from 'react'
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, Divider, Grid, IconButton, makeStyles, Paper } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import CartItem from './CartItem'
import { checkAndChangeQuantity, deleteCart, deleteItemCart } from '../../actions/cartActions'

import { useState } from 'react'
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
		justifyContent: 'space-between',
		flexWrap: "nowrap",
		flexGrow: 1
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

const CartDetail = ({ cart_items, errors, isSelectedAll, setSelectedItem, setUnselectedItem, handleSelectedAllChange }) => {
	const classes = useStyles()
	const dispatch = useDispatch()

	const handleDeleteItem = (itemIndex) => () => dispatch(deleteItemCart({ itemIndex }))
	const handleChangeQtyItem = (itemIndex) => (event) => {
		dispatch(checkAndChangeQuantity({ itemIndex, quantity: parseInt(event.target.value) }))
	}
	const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
	const handleDeleteConfirmOpen = () => {
		setOpenDeleteConfirm(true)
	}
	const handleDeleteConfirmClose = () => {
		setOpenDeleteConfirm(false)
	}
	const handleDeleteAgree = () => {
		setOpenDeleteConfirm(false)
		dispatch(deleteCart())
	}
	const handleDeleteDisagree = () => {
		setOpenDeleteConfirm(false)
	}

	return (
		<Paper elevation={0}>
			<Grid key="header" className={classes.itemsHeader} container>
				<Grid key="item" className={`${classes.margin} ${classes.itemsHeaderLeft}`} item container sm={6} spacing={3}>
					<Checkbox disableRipple
						checked={isSelectedAll}
						onChange={handleSelectedAllChange}
					/>
					{`All (${cart_items.length} items)`}
				</Grid>
				<Grid key="other" className={`${classes.margin} ${classes.itemsHeaderRight}`} item container sm={6}>
					<Grid item key="price">Price</Grid>
					<Grid item key="quantity">Qty</Grid>
					<Grid item key="subtotal">Subtotal</Grid>
					<Grid item key="delete">
						<IconButton className={classes.delete} disableFocusRipple disableRipple onClick={handleDeleteConfirmOpen}>
							<Delete />
						</IconButton>
					</Grid>
				</Grid>
			</Grid>
			{cart_items.map((item, index) =>
				<div key={`item ${index + 1}`}>
					<Divider variant="middle" />
					<CartItem item={item} error={errors[index]}
						handleDeleteItem={handleDeleteItem(index)}
						handleChangeQtyItem={handleChangeQtyItem(index)}
						setSelectedItem={setSelectedItem}
						setUnselectedItem={setUnselectedItem}
					/>
				</div>)}

			<Dialog open={openDeleteConfirm} onClose={handleDeleteConfirmClose}>
				<DialogContent>
					<DialogContentText>Are you sure want to delete ALL item in your cart</DialogContentText>
					<DialogActions>
						<Button onClick={handleDeleteDisagree} color="primary" autoFocus>
							Disagree
						</Button>
						<Button onClick={handleDeleteAgree} color="secondary">
							Agree
						</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>
		</Paper>
	)
}

export default CartDetail
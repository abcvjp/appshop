import React from 'react'
import List from '@material-ui/core/List'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import MiniCartItem from './MiniCartItem'
import { deleteItemCart } from '../../actions/cartActions'
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%'
	},
	subTotal: {
		margin: theme.spacing(2)
	},
	checkOut: {
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0
	}
}))

const MiniCartDetail = () => {
	const classes = useStyles()
	const dispatch = useDispatch()

	const deleteItem = (itemIndex) => () => dispatch(deleteItemCart({ itemIndex }))

	const cart_items = useSelector(state => state.cart)

	return (
		<>
			<List className={classes.root} disablePadding dense>
				{cart_items.map((item, itemIndex) => {
					return (
						<MiniCartItem key={item.product.id} item={item}
							deleteItem={deleteItem(itemIndex)}
						/>
					)
				})}
			</List>
			<Button className={classes.checkOut} variant="contained" color="primary" size="large" href="/cart" fullWidth>
				VIEW CART & CHECK OUT
			</Button>
		</>
	)
}

export default MiniCartDetail

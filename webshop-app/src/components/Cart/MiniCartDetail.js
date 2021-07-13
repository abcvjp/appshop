import React from 'react'
import List from '@material-ui/core/List'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import CartItem from './CartItem'
import { deleteItemCart } from '../../actions/cartActions'
import { changeQuantityItemCart } from '../../actions/cartActions'
import { Typography } from '@material-ui/core'
import { Box } from '@material-ui/core'
import { Divider } from '@material-ui/core'
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

	const deleteItem = ({ id }) => () => dispatch(deleteItemCart({ id: id }))
	const changeQuantity = ({ id, quantity }) => dispatch(changeQuantityItemCart({ id, quantity }))

	const items = useSelector(state => state.cart)

	const subTotal = items.reduce((accumul, cur) => (accumul + cur.quantity * cur.price), 0)
	return (
		<>
			<List className={classes.root} disablePadding>
				{items.map((item) => {
					return (
						<CartItem key={item.id} item={item}
							changeQuantity={changeQuantity} deleteItem={deleteItem}
						/>
					)
				})}
			</List>
			<Divider variant="middle" />
			<Box p={1.5}>
				<Typography align="right">Subtotal: {subTotal}$</Typography>
			</Box>
			<Button className={classes.checkOut} variant="contained" color="secondary" size="large" href="/checkout" fullWidth>
				CHECK OUT
			</Button>
		</>
	)
}

export default MiniCartDetail

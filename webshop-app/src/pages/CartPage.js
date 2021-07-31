import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import CartDetail from '../components/Cart/CartDetail'
import CartSummary from '../components/Cart/CartSummary'
import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import API from '../utils/apiClient'
import { updateCart } from '../actions/cartActions'
import { showAlertMessage } from '../actions/alertMessageActions'


const useStyles = makeStyles(theme => ({
	root: {

	},
	title: {
		marginBlock: theme.spacing(2)
	},
	detail: {
		flexGrow: 1
	},
	summary: {
		flexGrow: 1,
		flexShrink: 1
	},

	margin: {
		margin: theme.spacing(1.5)
	}
}))

const CartPage = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const history = useHistory()
	const [, forceRerender] = useState(Date.now())

	const cart_items = useSelector(state => state.cart)
	const cart_status = useRef({
		isValid: true,
		isSelectedAll: false,
		errors: {}
	})
	const selectedItems = useRef([])

	const setSelectedItem = (item) => {
		selectedItems.current.push(item)
		if (selectedItems.current.length === cart_items.length) {
			cart_status.current.isSelectedAll = true
		}
		forceRerender(Date.now())
	}
	const setUnselectedItem = (item) => {
		const temp = selectedItems.current.filter(i => i.product_id !== item.product_id)
		selectedItems.current = temp
		if (cart_status.current.isSelectedAll) cart_status.current.isSelectedAll = false
		forceRerender(Date.now())
	}
	const handleSelectAllChange = () => {
		const isSelectedAll = cart_status.current.isSelectedAll
		if (!isSelectedAll) {
			const cannotSelect = cart_items.some(item => item.buy_able === false)
			if (cannotSelect) {
				dispatch(showAlertMessage({ type: 'error', content: `You can't select all item, some item is cannot be purchased` }))
			} else {
				selectedItems.current = [...cart_items]
				forceRerender(Date.now())
			}
		} else {
			selectedItems.current = []
			cart_status.current.isSelectedAll = false
			forceRerender(Date.now())
		}
	}

	const checkValid = async (cart_items, success_callback, fail_callback) => {
		API.post('/cart/check_valid', {
			cart_items: cart_items.map(item => ({
				product_id: item.product_id,
				product_name: item.product_name,
				price: item.price,
				quantity: item.quantity
			}))
		}).then(response => response.data).then(response => {
			if (response.success === true) {
				cart_status.current.isValid = true
				if (success_callback) success_callback(response)
			} else {
				cart_status.current = {
					isValid: false,
					errors: response.errors
				}
				if (fail_callback) fail_callback(response)
			}
		})
	}

	const handleProceedToCheckout = () => {
		if (selectedItems.current.length > 0) {
			checkValid(selectedItems.current, () => {
				history.push({
					pathname: '/checkout',
					orderItems: selectedItems.current
				})
			}, () => {
				dispatch(showAlertMessage({ type: 'warning', content: 'Something wrong with your cart, you should check again' }))
			})
		} else {
			dispatch(showAlertMessage({ type: 'warning', content: 'You must select items to order' }))
		}
	}
	const subtotal = selectedItems.current.reduce((accumul, cur) => (accumul + cur.quantity * cur.price), 0)

	useEffect(() => {
		checkValid(cart_items, (respone) => {
			selectedItems.current = [...cart_items]
			cart_status.current.isSelectedAll = true
			forceRerender(Date.now())
		}, (response) => {
			dispatch(updateCart({ items: response.valid_items }))
			dispatch(showAlertMessage({ type: 'warning', content: 'Something wrong with your cart, you should check again' }))
			forceRerender(Date.now())
		})
	}, [])

	return (
		<div className={classes.root}>
			<Typography variant="h5" className={classes.title}>Shopping Cart</Typography>
			{cart_items.length > 0 ?
				<Grid container className={classes.main} alignItems="flex-start" justifyContent="space-between" spacing={2}>
					<Grid item xs={12} md={9} key="cart_detail" className={classes.detail}>
						<CartDetail cart_items={cart_items} errors={cart_status.current.errors}
							setSelectedItem={setSelectedItem}
							setUnselectedItem={setUnselectedItem}
							handleSelectAllChange={handleSelectAllChange}
							isSelectedAll={cart_status.current.isSelectedAll}
						/>
					</Grid>
					<Grid item md={3} key="cart_summary" className={classes.summary}>
						<CartSummary subtotal={subtotal}
							handleProceedToCheckout={handleProceedToCheckout}
						/>
					</Grid>
				</Grid>
				:
				<Typography>Your cart is empty</Typography>}

		</div>
	)
}

export default CartPage
import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const CartIcon = ({ itemCount, handleCartIconClick }) => {
	return (
		<IconButton color="inherit" onClick={handleCartIconClick}>
			<Badge badgeContent={itemCount} color="secondary">
				<ShoppingCartIcon />
			</Badge>
		</IconButton>
	)
}

export default CartIcon

import React from 'react'
import { useSelector } from 'react-redux'
import { Popover } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { Box } from '@material-ui/core'
import CartIcon from './CartIcon'
import MiniCartDetail from './MiniCartDetail'

const MiniCart = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const items = useSelector(state => state.cart)
	const handlePopoverOpen = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handlePopoverClose = () => {
		setAnchorEl(null)
	}

	const open = Boolean(anchorEl)

	const itemCount = items.reduce((accumul, cur) => (accumul + cur.quantity), 0)
	return (
		<div>
			<CartIcon itemCount={itemCount} handleCartIconClick={handlePopoverOpen} />
			<Popover
				id="mouse-over-popover"
				open={open}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				onClose={handlePopoverClose}
				animation="false"
				disableRestoreFocus
			>
				{itemCount > 0 ? <MiniCartDetail />
					: <Box m={1}><Typography>CART IS EMPTY</Typography></Box>}
			</Popover>
		</div>
	)
}

export default MiniCart

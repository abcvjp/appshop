import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles, Popover } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { Box } from '@material-ui/core'
import MiniCartDetail from './MiniCartDetail'
import { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const useStyles = makeStyles(theme => ({
	popover: {
		pointerEvents: "none"
	},
	paper: {
		pointerEvents: "auto",
		padding: theme.spacing(1)
	}
}))
const MiniCart = () => {
	const classes = useStyles()
	const cart_items = useSelector(state => state.cart)
	const [anchorEl, setAnchorEl] = useState(null)

	const handlePopoverOpen = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handlePopoverClose = () => {
		setAnchorEl(null)
	}

	const open = Boolean(anchorEl)

	const itemCount = cart_items.reduce((accumul, cur) => (accumul + cur.quantity), 0)
	return (
		<div onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
			<IconButton color="inherit">
				<Badge badgeContent={itemCount} color="secondary">
					<ShoppingCartIcon />
				</Badge>
			</IconButton>
			<Popover
				id="mouse-over-popover"
				className={classes.popover}
				classes={{
					paper: classes.paper
				}}
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
				animation="false"
				disableRestoreFocus
				onClose={handlePopoverClose}
			>
				{itemCount > 0 ? <MiniCartDetail />
					: <Box m={1}><Typography>Your cart is current empty, let buy some product!</Typography></Box>}
			</Popover>
		</div>
	)
}

export default MiniCart

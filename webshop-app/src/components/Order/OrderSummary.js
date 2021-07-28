import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { Box, Divider, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { Collapse, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import { useState } from 'react'
import { useSelector } from 'react-redux'
const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(2),
		backgroundColor: grey[200]
	},
	margin: {
		marginBlock: theme.spacing(2)
	},
	total: {
		fontWeight: 'bold',
		fontSize: 'large',
		color: 'red'
	},
	checkout: {
		fontWeight: 'bold'
	}
}))

const OrderSummary = ({ order_items = [] }) => {
	const classes = useStyles()
	const [openCartDetail, setOpenCartDetail] = useState(false)
	const subtotal = order_items.reduce((accumul, cur) => (accumul + cur.quantity * cur.price), 0)
	const cart_items = useSelector(state => state.cart)
	const handleClickCartDetail = () => {
		setOpenCartDetail(!openCartDetail)
	}
	return (
		<Grid className={classes.root} container direction="column" justifyContent="flex-start" spacing={2}>
			<Grid item>
				<Typography variant="h6">Summary</Typography>
				<Divider key="divider_1" variant="fullWidth" />
			</Grid>
			<Grid item>
				<Box display="flex" justifyContent="space-between">
					<Typography>Subtotal</Typography>
					<Typography>${subtotal}</Typography>
				</Box>
			</Grid>
			<Grid item>
				<Box display="flex" justifyContent="space-between">
					<Typography>Discount</Typography>
					<Typography>${0}</Typography>
				</Box>
			</Grid>
			<Grid item>
				<Divider key="divider_2" variant="fullWidth" />
			</Grid>
			<Grid item>
				<Box display="flex" justifyContent="space-between">
					<Typography>Order Total</Typography>
					<Typography className={classes.total}>${subtotal}</Typography>
				</Box>
			</Grid>
			<Grid item>
				<ListItem button onClick={handleClickCartDetail}>
					<ListItemText primary={`${order_items.length} item in Cart`} />
					{openCartDetail ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Divider />
				<Collapse in={openCartDetail} timeout="auto" unmountOnExit>
					<List disablePadding dense>
						{cart_items.map(item =>
							<ListItem button>
								<ListItemAvatar>
									<Avatar src={item.product_thumbnail} />
								</ListItemAvatar>
								<ListItemText primary={item.product_name} secondary={`Price: ${item.price}\nQty: ${item.quantity}`} />
							</ListItem>
						)}
						<ListItem button>
							<ListItemText primary="Starred" />
						</ListItem>
						<ListItem button>
							<ListItemText primary="Starred" />
						</ListItem>
					</List>
				</Collapse>
			</Grid>


		</Grid>
	)
}

export default OrderSummary
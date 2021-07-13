import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import { Delete } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import { Box } from '@material-ui/core'
import { DEFAULT_COLOR } from '../../constants/ui'

const useStyles = makeStyles((theme) => ({
	textField: {
		maxWidth: 80
	},
	itemText: {
		maxWidth: 300
	}
}))
const CartItem = ({ item, deleteItem, changeQuantity }) => {
	const classes = useStyles()
	return (
		<ListItem>
			<ListItemAvatar>
				<Avatar
					src={item.productImgUrl}
				/>
			</ListItemAvatar>
			<ListItemText className={classes.itemText} primary={item.productName} secondary={item.price + '$'} />
			<Box ml={1} edge="end">
				<TextField
					className={classes.textField}
					label="Quantity"
					type="number"
					size="small"
					InputLabelProps={{
						shrink: true,
					}}
					variant="outlined"
					value={item.quantity}
					onChange={(e) => changeQuantity({ id: item.id, quantity: e.target.value })}
				/>
			</Box>
			<IconButton color={DEFAULT_COLOR} edge="end" onClick={deleteItem({ id: item.id })}>
				<Delete />
			</IconButton>
		</ListItem>
	)
}

export default CartItem

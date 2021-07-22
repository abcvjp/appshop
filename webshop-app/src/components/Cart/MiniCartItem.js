import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import { Delete } from '@material-ui/icons'
import { IconButton, ListItemSecondaryAction } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import { DEFAULT_COLOR } from '../../constants/ui'

const useStyles = makeStyles((theme) => ({
	textField: {
		maxWidth: 80
	},
	itemText: {
		maxWidth: 300
	}
}))
const MiniCartItem = ({ item, deleteItem }) => {
	const classes = useStyles()
	return (
		<ListItem button>
			<ListItemAvatar>
				<Avatar
					src={item.product.images[0]}
				/>
			</ListItemAvatar>
			<ListItemText className={classes.itemText} primary={item.product.name}
				secondary={item.product.price + '$ - Qty: ' + item.quantity} />
			<ListItemSecondaryAction>
				<IconButton color={DEFAULT_COLOR} edge="end" onClick={deleteItem}>
					<Delete />
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	)
}

export default MiniCartItem

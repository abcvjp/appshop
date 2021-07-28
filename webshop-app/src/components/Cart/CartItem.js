import React from 'react'
import { Avatar, IconButton, makeStyles, TextField, Box, Typography, Checkbox } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { useRef, useState, useEffect } from 'react'
import { isArrayEmpty } from '../../utils/utilFuncs'
const useStyles = makeStyles(theme => ({
	root: {

	},
	main: {
		justifyContent: "space-between",
		alignItems: "center",
		flexWrap: "nowrap",
		[theme.breakpoints.down('xs')]: {
			flexWrap: "wrap"
		}
	},
	name: {
		flexGrow: 1,
		justifyContent: 'flex-start',
		alignItems: "center"
	},
	metrics: {
		justifyContent: 'space-between',
		alignItems: 'center',
		flexWrap: "nowrap",
		flexGrow: 1
	},
	margin: {
		margin: theme.spacing(1)
	},
	avatar: {
		width: theme.spacing(12),
		height: theme.spacing(12),
	},
	qtyfield: {
		maxWidth: theme.spacing(10)
	},
	delete: {
		color: 'grey'
	},
	error: {
		color: 'red',
		display: 'flex',
		flexDirection: 'row-reverse',
		padding: 0,
		marginTop: 0,
		marginBottom: theme.spacing(2),
		marginRight: theme.spacing(2)
	}
}))

const CartItem = ({ item, error, handleChangeQtyItem, handleDeleteItem, setSelectedItem, setUnselectedItem }) => {
	const classes = useStyles()
	const [state, setState] = useState({
		selected: false,
		quantity: item.quantity
	})

	const handleQtyFieldChange = (event) => {
		setState({ ...state, quantity: event.target.value })
	}
	const handleSelectedChange = (event) => {
		if (item.buy_able) {
			const selected = event.target.checked
			setState({ ...state, selected })
			if (selected) { setSelectedItem(item) }
			else { setUnselectedItem(item) }
		}
	}
	useEffect(() => {
		setState({ ...state, quantity: item.quantity })
	}, [item.quantity])
	return (
		<>
			<Grid className={classes.main} container>
				<Grid key="item" className={`${classes.margin} ${classes.name}`} item container sm={6} spacing={3}>
					<Checkbox disableRipple
						checked={item.buy_able ? state.selected : false} onChange={handleSelectedChange} />
					<Grid item key='thumbnail'>
						<Avatar className={classes.avatar} src={item.product_thumbnail} alt={item.product_name} variant='square'></Avatar>
					</Grid>
					<Grid item key='item_name' style={{ alignSelf: 'flex-start' }}>{item.product_name}</Grid>
				</Grid>
				<Grid key="other" className={`${classes.margin} ${classes.metrics}`} item container sm={6}>
					<Grid key="price" item>{item.price}</Grid>
					<Grid key="quantity" item>
						<TextField className={classes.qtyfield} type="Number" variant="outlined" margin="none"
							value={state.quantity}
							onChange={handleQtyFieldChange}
							onBlur={handleChangeQtyItem} />
					</Grid>
					<Grid key="subtotal" item>
						{parseFloat(item.price * item.quantity)}
					</Grid>
					<Grid key="delete" item>
						<IconButton className={classes.delete} disableFocusRipple disableRipple
							onClick={handleDeleteItem}>
							<Delete />
						</IconButton>
					</Grid>
				</Grid>
			</Grid>
			{error && <Box className={classes.error} key="error">{error.map(err => `  ${err}`)}</Box>}
		</>
	)
}

export default CartItem

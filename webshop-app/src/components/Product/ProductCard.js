import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { blue } from '@material-ui/core/colors'
const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 300,
		maxHeight: 500,
		margin: theme.spacing(1, 0),
		display: "flex",
		flexDirection: "column",
		boxShadow: "none",
		justifyContent: "space-between",
		'&:hover': {
			transform: "scale(1.01)",
			backgroundColor: "#f5f5f5"
		},
	},
	area: {
		display: "flex",
		flexDirection: "column",
	},
	media: {
		maxHeight: 300
	},
	content: {
		padding: theme.spacing(2)
	},
	price: {
		fontWeight: 600
	},
	discount: {
		color: "white",
		backgroundColor: "red",
		padding: theme.spacing(0.3)
	},
	marginRight: {
		marginRight: theme.spacing(1)
	},
	addbutton: {
		backgroundColor: '#fff',
		color: blue[700],
		borderColor: blue[700],
		'&:hover': {
			backgroundColor: blue[700],
			color: '#fff',
			border: 0
		}
	}
}));

const ProductCard = ({ product, handleAddToCart }) => {
	const classes = useStyles()

	return (
		<Card className={classes.root}>
			<CardMedia
				className={classes.media}
				component="img"
				image='https://salt.tikicdn.com/cache/w444/ts/product/56/dd/e2/2612def5999d6417d9916a828cf054df.jpg'
				alt={product.name}
			/>
			<CardContent className={classes.content}>
				<Typography variant="subtitle1">
					{product.name}
				</Typography>
				<Box display="flex" flexDirection="row" justifyContent="flex-start"
					alignItems="center">
					<Box mr={0.5} mt={0.5}><Rating size="small" defaultValue={2.5} precision={0.5} readOnly /></Box>
					<Typography variant="body2">Sold 1</Typography>
				</Box>
				<Box display="flex" flexDirection="row" justifyContent="flex-start"
					alignItems="center">
					<Typography variant="h6" style={{ marginRight: 8 }}>
						${product.price}
					</Typography>
					<Typography variant="button" className={classes.discount}>
						{product.discount > 0 ? `-${product.discount * 100}%` : null} -32%
					</Typography>
				</Box>

			</CardContent>
			<CardActions>
				<Button className={classes.addbutton} fullWidth variant="outlined" size="small"
					onClick={handleAddToCart}>
					ADD TO CART
				</Button>
			</CardActions>
		</Card>
	)
}
export default ProductCard
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

import { Link as RouterLink } from 'react-router-dom'
import { Link } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	root: {
		boxShadow: "none",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		'&:hover': {
			boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
		},
		height: '100%'
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
		fontWeight: 600,
		background: blue[700],
		color: '#ffffff',
		border: 'solid 2px',
		borderColor: blue[700],
		transition: 'all 0.5s ease-in-out 0s',
		'&:hover': {
			background: 'transparent',
			color: blue[700],
		}

	}
}))

const ProductCard = ({ product, handleAddToCart }) => {
	const classes = useStyles()

	return (
		<Card className={classes.root}>
			<RouterLink to={`/product/${product.slug}`}>
				<CardMedia
					className={classes.media}
					component="img"
					image='https://salt.tikicdn.com/cache/w444/ts/product/56/dd/e2/2612def5999d6417d9916a828cf054df.jpg'
					alt={product.name}
				/>
			</RouterLink>
			<CardContent className={classes.content}>
				<Link component={RouterLink} to={`/product/${product.slug}`} color="inherit">
					<Typography variant="subtitle1">
						{product.name}
					</Typography>
				</Link>
				<Box display="flex" flexDirection="row" justifyContent="flex-start"
					alignItems="center">
					<Box mr={0.5} mt={0.5}><Rating size="small" defaultValue={2.5} precision={0.5} readOnly /></Box>
					<Typography variant="body2">| Sold 1</Typography>
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
				<Button className={classes.addbutton} variant="contained" color="primary" size="medium" disableElevation
					onClick={handleAddToCart}
				>
					Add to Cart
				</Button>
			</CardActions>
		</Card>
	)
}
export default ProductCard
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { DEFAULT_COLOR } from '../../constants/ui'

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
		height: 180,
	},
}));

const ProductCard = ({ product, handleAddToCart }) => {
	const classes = useStyles()

	return (
		<Card className={classes.root}>
			<CardMedia
				className={classes.media}
				image={product.productImgUrl}
				title="Contemplative Reptile"
			/>
			<CardContent>
				<Typography gutterBottom variant="subtitle1">
					{product.productName}
				</Typography>
				<Grid
					container
					direction="row"
					justify="space-between"
					alignItems="center"
				>
					<Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
					<Typography gutterBottom variant="subtitle1">
						$32
					</Typography>

				</Grid>
				<Typography variant="body2" color="textSecondary" component="p">
					Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
					across all continents except Antarctica
				</Typography>
			</CardContent>
			<CardActions>
				<Button fullWidth variant="outlined" size="small" color={DEFAULT_COLOR}
					onClick={handleAddToCart}>
					ADD TO CART
				</Button>
			</CardActions>
		</Card>
	)
}
export default ProductCard
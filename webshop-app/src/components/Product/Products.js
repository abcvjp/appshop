import React from 'react'

import { useDispatch } from 'react-redux'

import { checkAndAddToCart } from '../../actions/cartActions'

import { makeStyles } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import ProductCard from './ProductCard'

const useStyles = makeStyles((theme) => ({
	root: {
		flexWrap: 'wrap',
	},
	item: {

	}
}))

const Products = ({ products }) => {
	const classes = useStyles()
	const dispatch = useDispatch()

	const handleAddtoCart = (product) => () => {
		dispatch(checkAndAddToCart({
			product_id: product.id,
			product_name: product.name,
			product_slug: product.slug,
			price: product.price,
			quantity: 1
		}))
	}

	return (
		<Grid className={classes.root} container direction="row" justifyContent="flex-start" alignItems="stretch" spacing={1}>
			{
				products.map((product) => (
					<Grid item key={product.id} className={classes.item} xs={12} sm={4} md={3} xl={2}>
						<ProductCard
							product={product}
							handleAddToCart={handleAddtoCart(product)}
						/>
					</Grid>
				))
			}
		</Grid>
	)
}

export default Products

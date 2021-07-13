import React from 'react'
import { Grid } from '@material-ui/core'
import ProductCard from './ProductCard'
import { addToCart } from '../../actions/cartActions'
import { useSelector, useDispatch } from 'react-redux'
import { Pagination } from '@material-ui/lab'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { DEFAULT_PRODUCT_PAGE_LENGTH } from '../../constants/ui'
import { DEFAULT_COLOR } from '../../constants/ui'
import { showMessage } from '../../actions/messageActions'

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(1)
	}
}))


const Products = () => {
	const products = useSelector(state => state.products)
	const dispatch = useDispatch()
	const [currentPage, setCurrentPage] = useState(1)
	const pageLength = DEFAULT_PRODUCT_PAGE_LENGTH
	const itemCount = products.length
	const pageCount = (itemCount < pageLength) ? 1 :
		((itemCount % pageLength === 0) ? (itemCount / pageLength) : (itemCount / pageLength + 1))

	const handleAddtoCart = (product) => () => {
		dispatch(addToCart(product))
		dispatch(showMessage({ type: "success", content: "Added cart successfully" }))
	}

	const classes = useStyles()
	return (
		<>
			<Grid
				className={classes.root}
				container
				direction="row"
				justify="center"
				alignItems="stretch"
			>
				{products.filter((product, index) => (index + 1 > (currentPage - 1) * pageLength) && (index + 1 <= currentPage * pageLength))
					.map((product) => (
						<Grid item style={{ display: "flex" }} key={product.id}>
							<ProductCard
								product={product}
								handleAddToCart={handleAddtoCart(product)}
							/>
						</Grid>
					))}
			</Grid>

			{// Pagination
				<Grid container className={classes.root} direction="row" justify="center" alignItems="center">
					<Pagination size="large" color={DEFAULT_COLOR}
						count={pageCount} page={currentPage} onChange={(e, page) => {
							setCurrentPage(page)
						}} />
				</Grid>}
		</>
	)
}

export default Products
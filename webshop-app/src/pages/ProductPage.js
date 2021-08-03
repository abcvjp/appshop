import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'

import { generateBreadCrumbs, isArrayEmpty, isObjectEmpty } from '../utils/utilFuncs'
import { checkAndAddToCart } from '../actions/cartActions'
import { showAlertMessage } from '../actions/alertMessageActions'
import API from '../utils/apiClient'


import { Grid, makeStyles, Box, Paper, Divider, Button } from '@material-ui/core'
import Breadcrumbs from '../components/Breadcrumbs'
import ProductDetail from '../components/Product/ProductDetail'
import QuantitySelector from '../components/Product/QuantitySelector'
import ProductImages from '../components/Product/ProductImages'
import ProductDescription from '../components/Product/ProductDescription'

const useStyles = makeStyles((theme) => ({
	root: {

	},
	main: {
	},
	marginBlock: {
		marginBlock: theme.spacing(2)
	},
	margin: {
		margin: theme.spacing(2)
	},
	addcart: {
		fontWeight: 'bold',
		background: '#212529',
		color: '#ffffff',
		border: 'solid 2px #212529',
		transition: 'all 0.5s ease-in-out 0s',
		'&:hover': {
			background: 'transparent',
			color: '#212529',
		}
	},
	buynow: {
		marginLeft: theme.spacing(1),
		fontWeight: 'bold',
		background: 'red',
		color: '#ffffff',
		border: 'solid 2px red',
		transition: 'all 0.5s ease-in-out 0s',
		'&:hover': {
			background: 'transparent',
			color: 'red'
		}
	}
}))

const ProductPage = () => {
	const classes = useStyles()
	const history = useHistory()
	const dispatch = useDispatch()

	const { productSlug } = useParams()
	const data = useRef({
		product: null,
		related_products: [],
		breadcrumbs: []
	})
	const product = data.current.product

	const [qty, setQty] = useState(1)

	const [, forceRerender] = useState(Date.now())

	const handleQtyChange = (event) => {
		const qty = parseInt(event.target.value)
		if (qty > product.quantity) {
			dispatch(showAlertMessage({ type: 'error', content: `You can only buy ${product.quantity} product` }))
		} else setQty(qty)
	}

	const handleAddtoCart = () => {
		dispatch(checkAndAddToCart({
			product_id: product.id,
			product_name: product.name,
			product_slug: product.slug,
			price: product.price,
			quantity: qty
		}))
	}

	const handleBuyNow = () => {
		history.push({
			pathname: "/checkout",
			orderItems: [{
				product_id: product.id,
				product_name: product.name,
				product_slug: product.slug,
				product_thumbnail: product.images[0],
				price: product.price,
				quantity: qty
			}]
		})
	}

	const categoriesStore = useSelector(state => state.categories)
	useEffect(() => {
		API.get(`/product?slug=${productSlug}`).then(response => response.data.data).then(product => {
			data.current.product = product
			forceRerender(Date.now())
		}).catch(err => {
			console.log(err)
		})
	}, [productSlug])

	useEffect(() => {
		if (data.current.product && !isObjectEmpty(categoriesStore.map_name_slug)) {
			const product = data.current.product
			data.current = {
				...data.current,
				product,
				breadcrumbs: generateBreadCrumbs(product.category.path + ' - ' + product.name, categoriesStore.map_name_slug)
			}
			forceRerender(Date.now())
		}
	}, [data.current.product, categoriesStore.map_name_slug])

	return (
		<div>
			{!isArrayEmpty(data.current.breadcrumbs) && <Breadcrumbs breadcrumbs={data.current.breadcrumbs} />}
			{product &&
				<div>
					<Paper elevation={0} style={{ padding: 16 }}>
						<Grid container direction="row" justifyContent="space-between" spacing={4}>
							<Grid key="product_images" item xs={12} md={6}>
								<ProductImages images={product.images} productName={product.name} />
							</Grid>
							<Grid key="product_detail" className={`${classes.detail}`} item md={6}>
								<ProductDetail product={product} />
								<Divider light />
								<div className={classes.marginBlock}>
									<QuantitySelector qty={qty} handleQtyChange={handleQtyChange} />
								</div>
								<Box display="flex">
									<Button className={classes.addcart} variant="contained" color="primary" size="medium" disableElevation
										onClick={handleAddtoCart}
									>
										ADD TO CART
									</Button>
									<Button className={classes.buynow} variant="contained" color="primary" size="medium" disableElevation
										onClick={handleBuyNow}
									>
										BUY NOW
									</Button>
								</Box>
							</Grid>
						</Grid>
					</Paper>
					<div className={classes.marginBlock}>
						<ProductDescription description={product.description} />
					</div>
				</div>}
		</div>
	)
}

export default ProductPage

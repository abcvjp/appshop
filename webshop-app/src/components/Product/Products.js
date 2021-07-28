import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import ProductCard from './ProductCard'
import { checkAndAddToCart } from '../../actions/cartActions'
import { Pagination } from '@material-ui/lab'
import { Box } from '@material-ui/core'
import { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core'
import { DEFAULT_COLOR } from '../../constants/ui'
import API from '../../utils/apiClient'
import { useDispatch } from 'react-redux'
import SortSelector from './SortSelector'
import PageSizeSelector from './PageSizeSelector'
import { isArrayEmpty } from '../../utils/utilFuncs'

const useStyles = makeStyles((theme) => ({
	root: {
		flexWrap: 'wrap',
	},
	item: {
		width: "25%",
	},
	myflex: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: theme.spacing(1.5)
	}
}))

const Products = ({ categoryId, categorySlug }) => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const products = useRef([])
	const initialState = {
		currentPage: 1,
		pageSize: 8,
		pageCount: 1,
		itemCount: 0,
		sort: '',
	}
	const [state, setState] = useState(initialState)

	const handleAddtoCart = (product) => () => {
		dispatch(checkAndAddToCart({
			product_id: product.id,
			product_name: product.name,
			product_slug: product.slug,
			price: product.price,
			quantity: 1
		}))
	}

	const handleSortChange = (e) => {
		setState({
			...state,
			sort: e.target.value,
			currentPage: 1
		})
	}

	const handlePageSizeChange = (e) => {
		setState({
			...state,
			pageSize: e.target.value,
			currentPage: 1
		})
	}

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const sort = state.sort ? `&sort=${state.sort}` : ''
				const category_id = categoryId ? `&category_id=${categoryId}` : ''
				const category_slug = categorySlug ? `&category_slug=${categorySlug}` : ''
				const response = await API.get(`/product?current_page=${state.currentPage}&page_size=${state.pageSize}`
					+ sort + category_id + category_slug)
				products.current = response.data.data
				setState(state => ({
					...state,
					currentPage: response.data.pagination.currentPage,
					pageCount: response.data.pagination.pageCount,
					itemCount: response.data.pagination.count
				}))
			} catch (error) {
				products.current = []
				setState({
					currentPage: 1,
					pageSize: 8,
					pageCount: 1,
					itemCount: 0,
					sort: '',
				})
				if (error.response) {
					// Request made and server responded
					console.log(error.response.data)
					console.log(error.response.status)
					console.log(error.response.headers)
				} else if (error.request) {
					// The request was made but no response was received
					console.log(error.request)
				} else {
					// Something happened in setting up the request that triggered an Error
					console.log('Error', error.message)
				}
			}
		}
		fetchProducts()
	}, [state.currentPage, state.pageSize, state.sort, categoryId, categorySlug])
	return (
		<>
			<Box className={classes.myflex} key='box1'>
				<Typography>
					{`Found ${state.itemCount} items`}
				</Typography>
				<SortSelector handleSortChange={handleSortChange} />
			</Box>

			<Grid className={classes.root} container direction="row" justifyContent="flex-start" alignItems="stretch" spacing={0}>
				{
					!isArrayEmpty(products.current) > 0 ? products.current.map((product) => (
						<Grid item key={product.id} className={classes.item}>
							<ProductCard
								product={product}
								handleAddToCart={handleAddtoCart(product)}
							/>
						</Grid>
					)) : null}
			</Grid>

			<Box className={classes.myflex} key='box2'>
				<Pagination size="large" color={DEFAULT_COLOR}
					count={state.pageCount} page={state.currentPage} onChange={(e, page) => {
						setState({ ...state, currentPage: page })
					}} />
				<PageSizeSelector pageSize={state.pageSize} handlePageSizeChange={handlePageSizeChange} />
			</Box>
		</>
	)
}

export default Products


import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import ProductCard from './ProductCard'
import { addToCart } from '../../actions/cartActions'
import { Pagination } from '@material-ui/lab'
import { Box } from '@material-ui/core'
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import { DEFAULT_COLOR } from '../../constants/ui'
import { showAlertMessage } from '../../actions/alertMessageActions'
import API from '../../utils/apiClient'
import { useDispatch } from 'react-redux'
import SortSelector from './SortSelector'
import PageSizeSelector from './PageSizeSelector'

const useStyles = makeStyles((theme) => ({
	root: {
		flexWrap: 'wrap',
	},
	item: {
		width: "25%",
	},
	myflex: {
		display: 'flex',
		margin: theme.spacing(1),
		justifyContent: 'space-between',
		alignItems: 'center'
	}
}))

const Products = ({ category_id }) => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const [data, setData] = useState({
		products: [],
		currentPage: 1,
		pageSize: 8,
		pageCount: 1,
		itemCount: 0,
		sort: '',
	})
	console.log(data)
	const handleAddtoCart = (product) => () => {
		dispatch(addToCart({ product }))
		dispatch(showAlertMessage({ type: "success", content: "Added cart successfully" }))
	}

	const handleSortChange = (e) => {
		setData({
			...data,
			sort: e.target.value,
			currentPage: 1
		})
	}

	const handlePageSizeChange = (e) => {
		setData({
			...data,
			pageSize: e.target.value,
			currentPage: 1
		})
	}

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const sort = data.sort ? `&sort=${data.sort}` : ''
				const response = await API.get(`/product?current_page=${data.currentPage}&page_size=${data.pageSize}`
					+ sort + (category_id ? category_id : ''))
				setData(data => ({
					...data,
					products: response.data.data,
					currentPage: response.data.pagination.currentPage,
					pageCount: response.data.pagination.pageCount,
					itemCount: response.data.pagination.count
				}))
			} catch (error) {
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
	}, [data.currentPage, data.pageSize, data.sort, category_id])

	return (
		<>
			<Box className={classes.myflex} key='box1'>
				<Typography>
					{`Found ${data.itemCount} items`}
				</Typography>
				<SortSelector handleSortChange={handleSortChange} />
			</Box>

			<Grid className={classes.root} container direction="row" justifyContent="flex-start" alignItems="stretch" spacing={0}>
				{data.products.map((product) => (
					<Grid item key={product.id} className={classes.item}>
						<ProductCard
							product={product}
							handleAddToCart={handleAddtoCart(product)}
						/>
					</Grid>
				))}
			</Grid>

			<Box className={classes.myflex} key='box2'>
				<Pagination size="large" color={DEFAULT_COLOR}
					count={data.pageCount} page={data.currentPage} onChange={(e, page) => {
						setData({ ...data, currentPage: page })
					}} />
				<PageSizeSelector pageSize={data.pageSize} handlePageSizeChange={handlePageSizeChange} />
			</Box>
		</>
	)
}

export default Products


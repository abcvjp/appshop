import React from 'react'
import { Typography } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { Box } from '@material-ui/core'
import { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core'
import { DEFAULT_COLOR } from '../../constants/ui'
import API from '../../utils/apiClient'
import SortSelector from './SortSelector'
import PageSizeSelector from './PageSizeSelector'
import { isArrayEmpty } from '../../utils/utilFuncs'
import Products from './Products'

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
		margin: theme.spacing(2)
	}
}))

const ProductList = ({ fetchQuery, sortElemnents }) => {

	const classes = useStyles()
	const products = useRef([])
	const initialState = {
		currentPage: 1,
		pageSize: 8,
		pageCount: 1,
		itemCount: 0,
		sort: 'createdAt.DESC',
	}
	const [state, setState] = useState(initialState)

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
			pageSize: parseInt(e.target.value),
			currentPage: 1
		})
	}

	const handlePageChange = (e, page) => {
		setState({ ...state, currentPage: page })
	}

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const sort = state.sort ? `&sort=${state.sort}` : ''
				const response = await API.get(`${fetchQuery}
					&current_page=${state.currentPage}&page_size=${state.pageSize}` + sort)
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
	}, [fetchQuery, state.currentPage, state.pageSize, state.sort])

	return (
		<>
			<Box className={classes.myflex} key='box1'>
				<Typography>
					{`Found ${state.itemCount} items`}
				</Typography>
				<SortSelector
					handleSortChange={handleSortChange}
					sortElemnents={sortElemnents}
				/>
			</Box>

			{!isArrayEmpty(products.current) && <Products products={products.current} />}

			<Box className={classes.myflex} key='box2'>
				<Pagination size="large" color={DEFAULT_COLOR}
					count={state.pageCount} page={state.currentPage}
					onChange={handlePageChange}
				/>
				<PageSizeSelector
					pageSize={state.pageSize}
					handlePageSizeChange={handlePageSizeChange}
				/>
			</Box>
		</>
	)
}

ProductList.defaultProps = {
	fetchQuery: "/product/all?",
	sortElemnents: [
		{ name: 'Newest', value: 'createdAt.desc' },
		{ name: 'Price (Low to High)', value: 'price.asc' },
		{ name: 'Price (High to Low)', value: 'price.desc' },
		{ name: 'Discount', value: 'discount.desc' },
		{ name: 'Best Selling', value: 'sold.desc' }]
}

export default ProductList


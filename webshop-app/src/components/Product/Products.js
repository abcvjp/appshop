import React from 'react'
import { Grid } from '@material-ui/core'
import ProductCard from './ProductCard'
import { addToCart } from '../../actions/cartActions'
import { Pagination } from '@material-ui/lab'
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import { DEFAULT_COLOR } from '../../constants/ui'
import { showAlertMessage } from '../../actions/alertMessageActions'
import API from '../../utils/apiClient'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(1)
	}
}))


const Products = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const [data, setData] = useState({
		products: [],
		currentPage: 1,
		pageSize: 6,
		pageCount: 1,
	})

	const handleAddtoCart = (product) => () => {
		dispatch(addToCart({ product }))
		dispatch(showAlertMessage({ type: "success", content: "Added cart successfully" }))
	}

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await API.get(`/product?currentPage=${data.currentPage}&pageSize=${data.pageSize}`)
				setData(data => ({
					...data,
					products: response.data.data,
					currentPage: response.data.pagination.currentPage,
					pageCount: response.data.pagination.pageCount
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
	}, [data.currentPage, data.pageSize])

	return (
		<>
			<Grid
				className={classes.root}
				container
				direction="row"
				justifyContent="center"
				alignItems="stretch"
			>
				{data.products.map((product) => (
					<Grid item style={{ display: "flex" }} key={product.id}>
						<ProductCard
							product={product}
							handleAddToCart={handleAddtoCart(product)}
						/>
					</Grid>
				))}
			</Grid>

			{// Pagination
				<Grid container className={classes.root} direction="row" justifyContent="center" alignItems="center">
					<Pagination size="large" color={DEFAULT_COLOR}
						count={data.pageCount} page={data.currentPage} onChange={(e, page) => {
							setData({ ...data, currentPage: page })
						}} />
				</Grid>}
		</>
	)
}

export default Products
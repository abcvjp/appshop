import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import Products from '../components/Product/Products'
import Breadcrumbs from '../components/Breadcrumb'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBreadcrumbs } from '../actions/breadcrumbsActions'
import { generateBreadCrumbs, isArrayEmpty, isObjectEmpty } from '../utils/utilFuncs'
import { useParams } from 'react-router'
import API from '../utils/apiClient'
const useStyles = makeStyles({
	root: {

	},
	container: {
	},
})

const CategoryPage = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const { categorySlug } = useParams()
	const [category, setCategory] = useState(null)

	const categoriesStore = useSelector(state => state.categories)

	console.log('categories store')
	console.log(categoriesStore)

	useEffect(() => {
		const fetchCategoryBySlug = async (slug) => {
			try {
				const response = await API.get(`/category?slug=${slug}`)
				console.log('Fetch category ')
				setCategory(response.data.data)
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
		// CHECK CATEGORY IN STORE OTHERWISE FETCH CATEGORY BY SLUG
		if (!isObjectEmpty(categoriesStore.map_slug_id)) {
			const categoryId = categoriesStore.map_slug_id[categorySlug]
			setCategory(categoriesStore.all[categoryId])
		} else fetchCategoryBySlug(categorySlug)

	}, [categorySlug])

	const breadcrumbs = !isObjectEmpty(categoriesStore.map_name_slug) && category ?
		generateBreadCrumbs(category.path, categoriesStore.map_name_slug) : []
	console.log(breadcrumbs)
	return (
		<>
			<Breadcrumbs breadcrumbs={breadcrumbs} />
		</>
	)
}

export default CategoryPage
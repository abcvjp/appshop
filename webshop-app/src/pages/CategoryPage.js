import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import Products from '../components/Product/Products'
import Breadcrumbs from '../components/Breadcrumb'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBreadcrumbs } from '../actions/breadcrumbsActions'
import { isArrayEmpty } from '../utils/utilFuncs'
import { useParams } from 'react-router'
const useStyles = makeStyles({
	container: {
	},
})

const CategoryPage = ({ category }) => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const { categorySlug } = useParams()

	const map_name_slug = useSelector(state => state.categories.map_name_slug)
	const map_slug_id = useSelector(state => state.categories.map_slug_id)

	const breadcrumbs = useSelector(state => state.ui.breadcrumbs)
	// useEffect(() => {
	// // SET breadcrumbs
	// const breadcrumbsToSet = category.path.split(' - ').map(name => ({
	// name,
	// path: '/' + map_name_slug[name]
	// }))
	// dispatch(setBreadcrumbs(breadcrumbsToSet))
	// })
	return (
		<>
			{isArrayEmpty(breadcrumbs) ? null : <Breadcrumbs breadcrumbs={breadcrumbs} />}
		</>
	)
}

export default CategoryPage
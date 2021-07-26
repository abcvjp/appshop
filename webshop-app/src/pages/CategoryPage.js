import React from 'react'
import { Grid, Divider, makeStyles, Paper, ThemeProvider } from '@material-ui/core'
import Products from '../components/Product/Products'
import Breadcrumbs from '../components/Breadcrumb'
import { Box } from '@material-ui/core'
import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { generateBreadCrumbs, isArrayEmpty, isObjectEmpty } from '../utils/utilFuncs'
import { useParams } from 'react-router'
import API from '../utils/apiClient'
const useStyles = makeStyles((theme) => ({
	root: {

	},
	main: {
	},

	bar: {
		padding: theme.spacing(1.5)
	},
}))

const CategoryPage = () => {
	const classes = useStyles()
	const { categorySlug } = useParams()

	const data = useRef({
		category: null,
		childs: [],
		breadcrumbs: []
	})
	const [, forceRerender] = useState(Date.now())

	const categoriesStore = useSelector(state => state.categories)

	console.log(`render`)
	console.log(categorySlug)
	console.log(data)
	console.log('store: ')
	console.log(categoriesStore)

	useEffect(() => {
		// CHECK CATEGORY IN STORE OTHERWISE FETCH CATEGORY BY SLUG
		if (!isObjectEmpty(categoriesStore.map_slug_id)) {
			const categoryId = categoriesStore.map_slug_id[categorySlug]
			const category = categoriesStore.all[categoryId]
			const childs = categoriesStore.list_all.filter(child => child.parent_id === categoryId)
			data.current = {
				category,
				childs,
				breadcrumbs: generateBreadCrumbs(category.path, categoriesStore.map_name_slug)
			}
			forceRerender(Date.now())
			console.log('rerendered by effect')
		}
	}, [categorySlug, categoriesStore])

	return (
		<>
			<Box mt={2} mb={2}>
				{!isArrayEmpty(data.current.breadcrumbs) && <Breadcrumbs breadcrumbs={data.current.breadcrumbs} />}
			</Box>
			<Paper elevation={1} square>
				<Grid container spacing={0} wrap="nowrap">
					<Grid item xs={2} className={classes.bar}>
						{`HOAI DEP TRAI VAI LON`}
					</Grid>
					<Divider orientation="vertical" flexItem light />
					<Grid item xs={10} className={classes.main}>
						<Products categorySlug={categorySlug} />
					</Grid>
				</Grid>
			</Paper>
		</>
	)
}

export default CategoryPage
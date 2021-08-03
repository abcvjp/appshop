import React from 'react'
import { Grid, Divider, makeStyles, Paper, List, ListItem, Link, Typography } from '@material-ui/core'
import ProductList from '../components/Product/ProductList'
import Breadcrumbs from '../components/Breadcrumbs'
import { Link as RouterLink } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { generateBreadCrumbs, isArrayEmpty, isObjectEmpty } from '../utils/utilFuncs'
import { useParams } from 'react-router'

const useStyles = makeStyles((theme) => ({
	root: {

	},
	main: {
	},
	margin: {
		margin: theme.spacing(2)
	},
	bar: {
		padding: theme.spacing(1.5),
		borderRight: '1px solid #e6e6e6'
	}
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

	const fetchProductQuery = `/product/all?category_slug=${categorySlug}`

	return (
		<>
			{!isArrayEmpty(data.current.breadcrumbs) && <Breadcrumbs breadcrumbs={data.current.breadcrumbs} />}
			<Paper elevation={1} square>
				<Grid container spacing={0}>
					<Grid key="childs_category" item xs={12} sm={2} className={classes.bar}>
						<List>
							{data.current.childs.length > 0 && data.current.childs.map(child =>
								<ListItem key={child.name}>
									<Link to={`${child.slug}`} component={RouterLink}>{child.name}</Link>
								</ListItem>
							)}
						</List>
					</Grid>
					<Grid key="product_list" item sm={10} className={classes.main}>
						{data.current.category &&
							<Typography className={classes.margin} variant="h4">
								{data.current.category.name}
							</Typography>}
						<ProductList fetchQuery={fetchProductQuery} />
					</Grid>
				</Grid>
			</Paper>
		</>
	)
}

export default CategoryPage
import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import HeaderCategory from './HeaderCategory'
import { Box } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setCategories } from '../../actions/categoryActions'
import API from '../../utils/apiClient'
import { isArrayEmpty } from '../../utils/utilFuncs'
const useStyles = makeStyles((theme) => ({
	root: {
	}
}))
const HeaderCategories = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const categories = useSelector(state => state.categories.tree)
	useEffect(() => {
		API.get('/category').then(response => response.data.data)
			.then(categories => dispatch(setCategories(categories)))
			.catch(error => console.log(error))
	}, [])
	return (
		!isArrayEmpty(categories) && <Box className={classes.root} display="flex" flexDirection="row" justifyContent="space-around" alignItems="center">
			{categories.map((category) =>
				<HeaderCategory key={category.id} category={category} />
			)}
		</Box>
	)
}

export default HeaderCategories

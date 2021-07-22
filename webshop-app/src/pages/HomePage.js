import React from 'react'
import { makeStyles } from '@material-ui/core'
import {
	Container
} from '@material-ui/core'
import Products from '../components/Product/Products'
const useStyles = makeStyles({
	container: {
	},
});

const HomePage = () => {
	const classes = useStyles()
	return (
		<>
			<Container className={classes.container}>
				<Products />
			</Container>
		</>
	)
}

export default HomePage

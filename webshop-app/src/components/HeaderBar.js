import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import MiniCart from './Cart/MiniCart'
import { Container, CssBaseline, Divider } from '@material-ui/core'
import HeaderCategories from './Category/HeaderCategories'

const useStyles = makeStyles((theme) => ({
	headerbar: {
		position: 'fixed',
	},
	toolbar: {
		margin: 0,
		padding: 0
	},
	grow: {
		flexGrow: 1,
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: '#eeeeee',
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '40ch',
		},
	},
}));



const HeaderBar = () => {
	const classes = useStyles();
	return (
		<div>
			<CssBaseline />
			<AppBar position="sticky" color="inherit" elevation={0}>
				<Container maxWidth="lg">
					<Toolbar className={classes.toolbar}>
						<Typography variant="h6" noWrap>
							WEBSHOP APP
						</Typography>

						<div className={classes.grow} />
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder="Search for product..."
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								inputProps={{ 'aria-label': 'search' }}
								fullWidth
							/>
						</div>

						<MiniCart />
					</Toolbar>
					<HeaderCategories />
				</Container>
				<Divider />
			</AppBar>
		</div>
	)
}
export default HeaderBar




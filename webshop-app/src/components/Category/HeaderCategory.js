import * as React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Menu from 'material-ui-popup-state/HoverMenu'
import MenuItem from '@material-ui/core/MenuItem'
import ChevronRight from '@material-ui/icons/ChevronRight'
import { Link as RouterLink } from 'react-router-dom'
import { Link } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import {
	usePopupState,
	bindHover,
	bindMenu,
} from 'material-ui-popup-state/hooks'
import { isArrayEmpty } from '../../utils/utilFuncs'

const ParentPopupState = React.createContext(null)

const HeaderCategory = ({ category }) => {
	const popupState = usePopupState({
		popupId: 'demoMenu',
		variant: 'popover',
		deferOpenClose: true,
	})

	function buildMenu(category) {
		return isArrayEmpty(category.childs) ?
			<MenuItem key={category.id} onClick={popupState.close}>
				<Link underline="none" color="inherit" component={RouterLink} to={`${category.slug}`}>
					{category.name}
				</Link>
			</MenuItem>
			:
			<Submenu key={category.id} popupId="evenMoreChoicesMenu" title={category.name} path={category.slug}>
				{category.childs.map(category => buildMenu(category))}
			</Submenu>
	}

	return (
		<div>
			<Button color="inherit" {...bindHover(popupState)}>
				<Link underline="none" component={RouterLink}
					to={`${category.slug}`} key={category.id}>{category.name}</Link>

			</Button>
			<ParentPopupState.Provider value={popupState}>
				<Menu
					{...bindMenu(popupState)}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
					transformOrigin={{ vertical: 'top', horizontal: 'left' }}
					getContentAnchorEl={null}
				>
					{category.childs.map(category => buildMenu(category))}
				</Menu>
			</ParentPopupState.Provider>
		</div >
	)
}

export default HeaderCategory

const submenuStyles = (theme) => ({
	menu: {
		marginTop: theme.spacing(-1),
	},
	title: {
		flexGrow: 1,
	},
	moreArrow: {
		marginRight: theme.spacing(-1),
	},
})

const Submenu = withStyles(submenuStyles)(
	// Unfortunately, MUI <Menu> injects refs into its children, which causes a
	// warning in some cases unless we use forwardRef here.
	React.forwardRef(({ classes, title, path, popupId, children, ...props }, ref) => {
		const parentPopupState = React.useContext(ParentPopupState)
		const popupState = usePopupState({
			popupId,
			variant: 'popover',
			parentPopupState,
			deferOpenClose: true,
		})
		return (
			<ParentPopupState.Provider value={popupState}>
				<MenuItem
					{...bindHover(popupState)}
					selected={popupState.isOpen}
					ref={ref}
				>
					<Link underline="none" color="inherit" component={RouterLink} to={path}>
						{title}
					</Link>
					<ChevronRight className={classes.moreArrow} />
				</MenuItem>
				<Menu
					{...bindMenu(popupState)}
					classes={{ paper: classes.menu }}
					anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
					transformOrigin={{ vertical: 'top', horizontal: 'left' }}
					getContentAnchorEl={null}
					{...props}
				>
					{children}
				</Menu>
			</ParentPopupState.Provider>
		)
	})
)
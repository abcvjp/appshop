import { SET_BREADCRUMBS } from "../constants/actionTypes"

export const setBreadcrumbs = (breadcrumbs) => ({
	type: SET_BREADCRUMBS,
	breadcrumbs
})

export const setBreadcrumbsByString = (string) => ({
	type: SET_BREADCRUMBS,
	string
})
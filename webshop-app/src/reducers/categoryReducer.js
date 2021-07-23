import { SET_CATEGORIES } from "../constants/actionTypes"
import { createDataTree } from '../utils/utilFuncs'

const initialState = {
	all: [],
	tree: [],
	map_slug_id: {},
	map_name_slug: {},
	map_name_id: {}
}

export default function categoryReducer(state = initialState, action) {
	switch (action.type) {
		case SET_CATEGORIES:
			const all = {}
			const tree = createDataTree(action.categories)
			const map_slug_id = {}
			const map_name_slug = {}
			const map_name_id = {}
			action.categories.forEach(category => {
				const { id, ...newCategory } = category
				all[category.id] = newCategory
				map_slug_id[category.slug] = category.id
				map_name_slug[category.name] = category.slug
				map_name_id[category.name] = category.id
			})

			return {
				all,
				tree,
				map_slug_id,
				map_name_slug,
				map_name_id
			}
		default:
			return state
	}
}
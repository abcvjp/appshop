const searchService = require('../services/search.service')
const asyncHandler = require('express-async-handler')
const Role = require('../helpers/roles.helper')

exports.searchProducts = asyncHandler(async (req, res, next) => {
	const { q, category_id, current_page, page_size, sort, enable, published, in_stock } = req.query
	const user = req.user
	let result
	if (user && user.role === Role.Admin) {
		result = await searchService.searchProducts({ keyword: q, category_id, current_page, page_size, sort, enable, published, in_stock })
	} else {
		result = await searchService.searchProducts({
			keyword: q,
			category_id, current_page, page_size, sort,
			enable: true,
			published: true,
			in_stock: true,
			exclude: ['enable', 'published']
		})
	}
	res.status(200).json(result)
})

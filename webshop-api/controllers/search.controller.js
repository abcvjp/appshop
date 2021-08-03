const searchService = require('../services/search.service')
const createError = require('http-errors')
const asyncHandler = require('express-async-handler')


exports.searchProducts = asyncHandler(async (req, res, next) => {
	const { q, category_id, current_page, page_size, sort } = req.query
	const result = await searchService.searchProducts({ keyword: q, category_id, current_page, page_size, sort })
	res.status(200).json(result)
})

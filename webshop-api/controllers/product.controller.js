const productService = require('../services/product.service')
const asyncHandler = require('express-async-handler')

exports.createProduct = asyncHandler(async (req, res, next) => {
	const { enable, name, category_id, title, price, quantity, discount, short_description, description, images,
		meta_title, meta_description, meta_keywords } = req.body
	const result = await productService.createProduct({
		enable, name, category_id, title, price, quantity, discount, short_description, description, images,
		meta_title, meta_description, meta_keywords
	})
	res.status(200).json(result)
})

exports.updateProduct = asyncHandler(async (req, res, next) => {
	const { productId } = req.params
	const { enable, name, title, price, quantity, discount, short_description, description, images, meta_title,
		meta_description, meta_keywords, category_id } = req.body
	const result = await productService.updateProduct({
		id: productId, enable, name, title, price, quantity, discount, short_description, description, images, meta_title,
		meta_description, meta_keywords, category_id
	})
	res.status(200).json(result)
})

exports.deleteProduct = asyncHandler(async (req, res, next) => {
	const productId = req.params.productId
	const result = await productService.deleteProduct({ id: productId })
	res.status(200).json(result)
})

exports.getProducts = asyncHandler(async (req, res, next) => {
	const { currentPage, pageSize, sortBy, categoryId } = req.query
	const result = await productService.getProducts({ currentPage, pageSize })
	res.status(200).json(result)
})

exports.getProductById = asyncHandler(async (req, res, next) => {
	const productId = req.params.productId
	const result = await productService.getProductById({ id: productId })
	res.status(200).json(result)
})
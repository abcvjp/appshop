const productService = require('../services/product.service')
const asyncHandler = require('express-async-handler')

exports.createProduct = asyncHandler(async (req, res, next) => {
	const { enable, name, title, price, quantity, root_price, short_description, description, images, meta_title,
	meta_description, meta_keywords, category_id } = req.body
	const result = await productService.createProduct({
		enable, name, category_id, title, price, quantity, root_price, short_description, description, images,
		meta_title, meta_description, meta_keywords
	})
	res.status(200).json(result)
})

exports.updateProduct = asyncHandler(async (req, res, next) => {
	const { productId } = req.params
	const { id, enable, name, title, price, root_price, quantity, short_description, description,
	images, meta_title, meta_description, meta_keywords, category_id } = req.body
	const result = await productService.updateProduct({
		id: productId, enable, name, title, price, root_price, quantity, short_description, description,
		images, meta_title, meta_description, meta_keywords, category_id
	})
	res.status(200).json(result)
})

exports.updateProducts = asyncHandler(async (req, res, next) => {
	const {products} = req.body
	const result = await productService.updateProducts({products})
	res.status(200).json(result)
})

exports.deleteProduct = asyncHandler(async (req, res, next) => {
	const productId = req.params.productId
	const result = await productService.deleteProduct({ id: productId })
	res.status(200).json(result)
})

exports.deleteProducts = asyncHandler(async (req, res, next) => {
	const { productIds } = req.body
	const result = await productService.deleteProducts({ productIds })
	res.status(200).json(result)
})

exports.getProducts = asyncHandler(async (req, res, next) => {
	const { current_page, page_size, sort, category_id, category_slug, enable, in_stock } = req.query
	const result = await productService.getProducts({ current_page, page_size, sort, category_id, category_slug, enable, in_stock })
	res.status(200).json(result)
})

exports.getProduct = asyncHandler(async (req, res, next) => {
	const { id, slug } = req.query
	const result = id ? await productService.getProductById({ id })
		: await productService.getProductBySlug({ slug })
	res.status(200).json(result)
})

exports.getProductById = asyncHandler(async (req, res, next) => {
	const productId = req.params.productId
	const result = await productService.getProductById({ id: productId })
	res.status(200).json(result)
})
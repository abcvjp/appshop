const productService = require('../services/product.service')
const asyncHandler = require('express-async-handler')

exports.createProduct = asyncHandler(async (req, res, next) => {
	const result = await productService.getProducts()
	res.status(200).json(result)
})

exports.updateProduct = asyncHandler(async (req, res, next) => {
	const result = ''
	res.status(200).json(result)
})

exports.deleteProduct = asyncHandler(async (req, res, next) => {
	const result = ''
	res.status(200).json(result)
})

exports.getProducts = asyncHandler(async (req, res, next) => {
	const result = ''
	res.status(200).json(result)
})

exports.getProductById = asyncHandler(async (req, res, next) => {
	const result = ''
	res.status(200).json(result)
})
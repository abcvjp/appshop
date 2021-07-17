const Product = require('../models').Product
const createError = require('http-errors')

exports.getProducts = () => {
	try {
		const result = await Product.findAll()
		if (!result) throw createError(404, "Can't find any product")
		return {
			success: true,
			data: result
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.getProductById = () => {
	try {

	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.createProduct = () => {
	try {

	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.updateProduct = () => {
	try {

	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.deleteProduct = () => {
	try {

	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}
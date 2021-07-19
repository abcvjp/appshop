const Product = require('../models').Product
const createError = require('http-errors')
const slug = require('slug')
const { uuid } = require('uuidv4')

exports.getProducts = async () => {
	try {
		const products = await Product.findAll()
		if (!products) throw createError(404, "Can't find any product")
		return {
			success: true,
			data: products
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.getProductById = async ({ id }) => {
	try {
		const productById = await Product.findByPk(id)
		if (!productById) throw createError(404, 'Product does not exist')
		return {
			success: true,
			data: productById
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.createProduct = async ({ enable, name, title, price, quantity, discount, short_description, description, images, meta_title,
	meta_description, meta_keywords, category_id }) => {
	try {
		const id = uuid()
		const slugName = slug(name)
		const newProduct = await Product.create({
			id,
			enable,
			name,
			title,
			price,
			quantity,
			discount,
			short_description,
			description,
			images,
			slug: slugName,
			meta_title,
			meta_description,
			meta_keywords,
			category_id
		})
		return { success: true, result: newProduct }
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.updateProduct = async ({ id, enable, name, title, price, quantity, discount, short_description, description,
	images, meta_title, meta_description, meta_keywords }) => {
	try {
		const productToUpdate = await Product.findByPk(id)
		if (!productToUpdate) throw createError(404, 'Product does not exist')
		if (productToUpdate.name !== name) {
			var slugName = slug(name)
		}
		await productToUpdate.update({
			enable,
			name,
			title,
			price,
			quantity,
			discount,
			short_description,
			description,
			slug: slugName,
			images,
			meta_title,
			meta_description,
			meta_keywords
		})
		return { success: true, result: productToUpdate }
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.deleteProduct = async ({ id }) => {
	try {
		const productToDelete = await Product.findByPk(id)
		if (!productToDelete) throw createError(404, 'Product does not exist')
		await productToDelete.destroy()
		return { success: true }
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}
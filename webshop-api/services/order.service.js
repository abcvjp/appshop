const Order = require('../models').Order
const createError = require('http-errors')
const slug = require('slug')
const { uuid } = require('uuidv4')

exports.getOrders = async () => {
	try {
		const orders = await Order.findAll()
		if (!orders) throw createError(404, "Can't find any order")
		return {
			success: true,
			data: orders
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.getOrderById = async ({ id }) => {
	try {
		const orderById = await Order.findByPk(id)
		if (!orderById) throw createError(404, 'Order does not exist')
		return {
			success: true,
			data: orderById
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.createOrder = async ({ customer_name, address, email, phone_number, shipping_note, payment_method_id, shipping_method_id, order_items }) => {
	try {
		const id = uuid()
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

exports.deleteOrder = async ({ id }) => {
	try {
		const orderToDelete = await Order.findByPk(id)
		if (!orderToDelete) throw createError(404, 'Order does not exist')
		await orderToDelete.destroy()
		return { success: true }
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}
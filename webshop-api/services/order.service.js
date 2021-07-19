const Order = require('../models').Order
const Product = require('../models').Product
const OrderItem = require('../models').OrderItem
const { sequelize } = require('../models')
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
		const orderById = await Order.findByPk(id, {
			include: [
				{
					association: 'payment_method',
					attributes: ['name', 'detail']
				},
				{
					association: 'shipping_method',
					attributes: ['name', 'detail']
				},
				{
					association: 'order_items',
					attributes: ['product_id', 'product_name', 'price', 'quantity']
				}
			]
		})
		if (!orderById) throw createError(404, 'Order does not exist')
		return {
			success: true,
			data: orderById
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.createOrder = async ({ customer_name, address, email, phone_number, shipping_note,
	payment_method_id, shipping_method_id, order_items }) => {
	try {
		// VALID AND CACULATE TOTAL
		order_items.sort((a, b) => {
			return a.product_id < b.product_id ? -1 : 1
		})
		const productsToOrder = await Product.findAll({
			where: {
				id: order_items.map(item => item.product_id)
			},
			attributes: ['id', 'enable', 'price', 'quantity', 'name'],
			order: ['id']
		})
		if (productsToOrder.length !== order_items.length) throw createError(409, "Any or some product ordered no longer exist")
		let cost = 0
		order_items.forEach((orderItem, i) => {
			if (!productsToOrder[i].enable) {
				throw createError(409, `Product ${orderItem.name} is disabled`)
			}
			if (productsToOrder[i].quantity < orderItem.quantity) {
				throw createError(409, `Stock quantity of ${orderItem.name} is not enough`)
			}
			if (productsToOrder[i].price !== orderItem.price) {
				throw createError(409, `Price of ${orderItem.product_name} has changed`)
			}
			if (productsToOrder[i].name !== orderItem.product_name) {
				throw createError(409, `Name of ${orderItem.product_name} has changed`)
			}
			cost += productsToOrder[i].price * order_items[i].quantity
		})

		// CREATE ORDER DATA
		cost = Math.round(cost * 100) / 100
		const id = uuid() // generate id
		const newOrder = {
			id,
			cost,
			customer_name,
			address,
			email,
			phone_number,
			shipping_note,
			payment_method_id,
			shipping_method_id
		}

		// CREATE ORDER AND ORDER ITEMS
		await sequelize.transaction(async (t) => {
			let promises = [Order.create(newOrder)] // create order
			order_items.map((order_item, i) => {
				// create order items and update product stock quantity
				promises.push(
					OrderItem.create({ ...order_item, order_id: newOrder.id }),
					productsToOrder[i].decrement('quantity', { by: order_item.quantity })
				)
			})
			await Promise.all(promises)
		})

		return {
			success: true,
			result: {
				order: newOrder,
				order_items
			}
		}
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

exports.cancelOrder = async ({ id }) => {
	try {
		const orderToCancel = await Order.findByPk(id)
		const orderItems = await OrderItem.findAll({
			where: {
				order_id: id
			},
			attributes: ['product_id', 'quantity'],
		})
		const productsToRestore = await Product.findAll({
			where: {
				id: orderItems.map(orderItem => orderItem.product_id)
			},
			attributes: ['id'],
		})

		// convert orderItems to set(dictionary) productId - quantity
		const set_productId_quantity = {}
		orderItems.forEach((item) => {
			const product_id = item.product_id
			set_productId_quantity.product_id = product_id
			set_productId_quantity[product_id] = item.quantity
		})

		await sequelize.transaction(async (t) => {
			await Promise.all([
				// CANCEL ORDER AND RESTORE PRODUCT QUANTITY IF PRODUCT EXIST
				orderToCancel.update({ status: 'Canceled' }),
				productsToRestore.map((product) => {
					product.increment('quantity', { by: set_productId_quantity[product.product_id] })
				})
			])
		})
		return { success: true }
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}
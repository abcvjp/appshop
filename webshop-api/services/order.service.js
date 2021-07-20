const { Order, Product, OrderItem, ShippingMethod } = require('../models')
const { sequelize } = require('../models')
const createError = require('http-errors')
const slug = require('slug')
const { uuid } = require('uuidv4')

exports.getOrders = async () => {
	try {
		const orders = await Order.findAll({
			include: [
				{
					association: 'payment_method',
					attributes: ['name']
				},
				{
					association: 'shipping_method',
					attributes: ['name']
				},
				{
					association: 'order_items',
					attributes: ['product_id', 'product_name', 'price', 'quantity']
				}
			]
		})
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
					attributes: ['name']
				},
				{
					association: 'shipping_method',
					attributes: ['name']
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
		// VALID AND CACULATE TOTAL COST
		order_items.sort((a, b) => {
			return a.product_id < b.product_id ? -1 : 1
		})
		// fetch product and shipping method
		const [productsToOrder, shippingMethod] = await Promise.all([
			Product.findAll({
				where: {
					id: order_items.map(item => item.product_id)
				},
				attributes: ['id', 'enable', 'price', 'quantity', 'name'],
				order: ['id']
			}),
			ShippingMethod.findByPk(shipping_method_id, { attributes: ['id', 'fee'] })
		])
		if (productsToOrder.length !== order_items.length) throw createError(409, "Any or some product ordered no longer exist")

		let cost = shippingMethod.fee
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

exports.updateOrder = async ({ id, customer_name, address, email, phone_number, shipping_note,
	payment_status, shipping_status }) => {
	try {
		const orderToUpdate = await Order.findByPk(id)
		if (!orderToUpdate) throw createError(404, 'Order does not exist')

		let status
		if (payment_status === 'Paid' && shipping_status === 'Successfully delivered') {
			status = 'Completed'
		}
		if (orderToUpdate.status === "Completed") {
			payment_status = shipping_status = null
		}
		await orderToUpdate.update({
			...status,
			customer_name,
			address, email,
			phone_number,
			shipping_note,
			...payment_status,
			...shipping_status
		})
		return {
			success: true,
			result: orderToUpdate
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.deleteOrder = async ({ id }) => {
	try {
		const orderToDelete = await Order.findByPk(id, {
			include: {
				association: 'order_items',
				attributes: ['id']
			}
		})
		if (!orderToDelete) throw createError(404, 'Order does not exist')
		await sequelize.transaction(async (t) => {
			await Promise.all([
				orderToDelete.destroy(),
				...orderToDelete.order_items.map(item => item.destroy())
			])
		})

		return { success: true }
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.cancelOrder = async ({ id }) => {
	try {
		const orderToCancel = await Order.findByPk(id, {
			include: {
				association: 'order_items',
				attributes: ['product_id', 'quantity']
			}
		})
		if (!orderToCancel) throw createError(404, 'Order does not exist')
		if (orderToCancel.status === 'Canceled') throw createError(409, 'Order is already canceled')
		if (orderToCancel.status === 'Completed') throw createError(409, 'Order is completed')

		const productsToRestore = await Product.findAll({
			where: {
				id: orderToCancel.order_items.map(orderItem => orderItem.product_id)
			},
			attributes: ['id'],
		})

		// convert orderItems to set(dictionary) productId - quantity
		const set_productId_quantity = {}
		orderToCancel.order_items.forEach((item) => {
			set_productId_quantity[item.product_id] = item.quantity
		})

		await sequelize.transaction(async (t) => {
			await Promise.all([
				// CANCEL ORDER AND RESTORE PRODUCT QUANTITY IF PRODUCT EXIST
				orderToCancel.update({ status: 'Canceled' }),
				productsToRestore.map((product) => {
					product.increment('quantity', { by: set_productId_quantity[product.id] })
				})
			])
		})
		return { success: true }
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.confirmlOrder = async ({ id }) => {
	try {
		const orderToConfirm = await Order.findByPk(id, { attributes: ['id', 'status'] })
		if (!orderToConfirm) throw createError(404, 'Order does not exist')
		if (orderToConfirm.status !== 'Pending') throw createError(409, 'Order is already confirmed')
		await orderToConfirm.update({ status: 'Handling' })
		return { success: true }
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.completelOrder = async ({ id }) => {
	try {
		const orderToComplete = await Order.findByPk(id, { attributes: ['id', 'status'] })
		if (!orderToComplete) throw createError(404, 'Order does not exist')
		if (orderToComplete.status === 'Completed') throw createError(409, 'Order is already completed')
		if (orderToComplete.status === 'Canceled') throw createError(409, 'Order is canceled')
		await orderToComplete.update({
			status: 'Completed',
			payment_status: 'Paid',
			shipping_status: 'Successfully delivered'
		})
		return { success: true }
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

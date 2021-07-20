const Product = require('../models').Product
const { Op, transaction } = require('../models').sequelize
const createError = require('http-errors')

exports.caculateSubTotal = async ({ cart_items }) => {
	try {
		cart_items.sort((a, b) => {
			return a.product_id < b.product_id ? -1 : 1
		})
		const productsToBuy = await Product.findAll({
			where: {
				id: cart_items.map(item => item.product_id)
			},
			attributes: ['id', 'price'],
			order: ['id']
		})
		if (productsToBuy.length !== cart_items.length) throw createError(409, "Any or some product ordered no longer exist")
		let subTotal = 0
		cart_items.forEach((cartItem, i) => {
			subTotal += productsToBuy[i].price * cartItem.quantity
		})
		return {
			success: true,
			result: Math.round(subTotal * 100) / 100
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.checkCartValid = async ({ cart_items }) => {
	try {
		cart_items.sort((a, b) => {
			return a.product_id < b.product_id ? -1 : 1
		})
		const productsToBuy = await Product.findAll({
			where: {
				id: cart_items.map(item => item.product_id)
			},
			attributes: ['id', 'enable', 'price', 'quantity', 'name'],
			order: ['id']
		})
		if (productsToBuy.length !== cart_items.length) throw createError(409, "Any or some product ordered no longer exist")
		// let subTotal = 0
		cart_items.forEach((cartItem, i) => {
			if (!productsToBuy[i].enable) {
				throw createError(409, `Product ${cartItem.product_name} is disabled`)
			}
			if (productsToBuy[i].quantity < cartItem.quantity) {
				throw createError(409, `Stock quantity of ${cartItem.product_name} is not enough`)
			}
			if (productsToBuy[i].price !== cartItem.price) {
				throw createError(409, `Price of ${cartItem.product_name} has changed`)
			}
			if (productsToBuy[i].name !== cartItem.product_name) {
				throw createError(409, `Name of ${cartItem.product_name} has changed`)
			}
			// subTotal += productsToBuy[i].price * cartItem.quantity
		})
		return {
			success: true
			// subTotal: Math.round(subTotal * 100) / 100
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}
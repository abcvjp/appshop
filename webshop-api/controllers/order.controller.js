const orderService = require('../services/order.service')
const asyncHandler = require('express-async-handler')

exports.createOrder = asyncHandler(async (req, res, next) => {
	const { customer_name, address, email, phone_number, shipping_note, payment_method_id, shipping_method_id,
		order_items } = req.body
	const result = await orderService.createOrder({
		customer_name, address, email, phone_number, shipping_note, payment_method_id, shipping_method_id,
		order_items
	})
	res.status(200).json(result)
})

exports.updateOrder = asyncHandler(async (req, res, next) => {
	const result = ''
	res.status(200).json(result)
})

exports.deleteOrder = asyncHandler(async (req, res, next) => {
	const { orderId } = req.params
	const result = await orderService.deleteOrder({ id: orderId })
	res.status(200).json(result)
})

exports.getOrders = asyncHandler(async (req, res, next) => {
	const result = await orderService.getOrders()
	res.status(200).json(result)
})

exports.getOrderById = asyncHandler(async (req, res, next) => {
	const { orderId } = req.params
	const result = await orderService.getOrderById({ id: orderId })
	res.status(200).json(result)
})

exports.cancelOrder = asyncHandler(async (req, res, next) => {
	const { orderId } = req.params
	const result = await orderService.cancelOrder({ id: orderId })
	res.status(200).json(result)
})
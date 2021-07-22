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

exports.updateOrderInfo = asyncHandler(async (req, res, next) => {
	const { orderId } = req.params
	const { customer_name, address, email, phone_number, shipping_note,
		payment_status, shipping_status } = req.body
	const result = await orderService.updateOrderInfo({
		id: orderId, customer_name, address, email, phone_number, shipping_note
	})
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

exports.confirmOrder = asyncHandler(async (req, res, next) => {
	const { orderId } = req.params
	const result = await orderService.confirmlOrder({ id: orderId })
	res.status(200).json(result)
})

exports.completeOrder = asyncHandler(async (req, res, next) => {
	const { orderId } = req.params
	const result = await orderService.completelOrder({ id: orderId })
	res.status(200).json(result)
})

exports.updateShippingStatus = asyncHandler(async (req, res, next) => {
	const { orderId } = req.params
	const { shipping_status } = req.body
	const result = await orderService.updateShippingStatus({ id: orderId, shipping_status })
	res.status(200).json(result)
})

exports.updatePaymentStatus = asyncHandler(async (req, res, next) => {
	const { orderId } = req.params
	const { payment_status } = req.body
	const result = await orderService.updatePaymentStatus({ id: orderId, payment_status })
	res.status(200).json(result)
})
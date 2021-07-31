const paymentService = require('../services/payment.service')
const asyncHandler = require('express-async-handler')

exports.getPaymentMethods = asyncHandler(async (req, res, next) => {
	const result = await paymentService.getPaymentMethods()
	res.status(200).json(result)
})
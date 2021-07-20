const Joi = require('joi')

module.exports = {
	getOrderById: {
		params: Joi.object({
			orderId: Joi.string().guid({ version: 'uuidv4' }).required()
		})
	},
	createOrder: {
		body: Joi.object({
			customer_name: Joi.string().trim().min(1).max(100).required(),
			address: Joi.string().trim().min(10).max(200).required(),
			email: Joi.string().trim().email().required(),
			phone_number: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
			shipping_note: Joi.string().max(255),
			payment_method_id: Joi.number().integer().min(1).required(),
			shipping_method_id: Joi.number().integer().min(1).required(),
			order_items: Joi.array().min(1).items(Joi.object({
				product_id: Joi.string().guid({ version: 'uuidv4' }).required(),
				price: Joi.number().precision(3).min(0).required(),
				quantity: Joi.number().integer().min(1).required(),
				product_name: Joi.string().trim().min(1).max(200).required(),
			})).unique('product_id').required()
		})
	},
	updateOrder: {
		params: Joi.object({
			orderId: Joi.string().guid({ version: 'uuidv4' }).required()
		}),
		body: Joi.object({
			payment_status: Joi.string().trim().valid('Unpaid', 'Paid').required(),
			shipping_status: Joi.string().trim().valid('Undelivered', 'Delivering', 'Successfully delivered', 'Delivery failed').required(),
			customer_name: Joi.string().trim().min(1).max(100).required(),
			address: Joi.string().trim().min(10).max(200).required(),
			email: Joi.string().trim().email().required(),
			phone_number: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
			shipping_note: Joi.string().max(255),
		})
	},
	deleteOrder: {
		params: Joi.object({
			orderId: Joi.string().guid({ version: 'uuidv4' }).required()
		})
	},
	cancelOrder: {
		params: Joi.object({
			orderId: Joi.string().guid({ version: 'uuidv4' }).required()
		})
	},
	confirmOrder: {
		params: Joi.object({
			orderId: Joi.string().guid({ version: 'uuidv4' }).required()
		})
	},
	completeOrder: {
		params: Joi.object({
			orderId: Joi.string().guid({ version: 'uuidv4' }).required()
		})
	},
}
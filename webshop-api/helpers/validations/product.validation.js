const Joi = require('joi')

module.exports = {
	getProductById: {
		params: Joi.object({
			productId: Joi.string().guid({ version: 'uuidv4' }).required()
		})
	},
	createProduct: {
		body: Joi.object({
			enable: Joi.boolean(),
			name: Joi.string().trim().min(1).max(200).required(),
			category_id: Joi.string().guid({ version: 'uuidv4' }).required(),
			title: Joi.string().trim().min(1).max(200).required(),
			price: Joi.number().precision(3).min(0).required(),
			quantity: Joi.number().integer().min(1).required(),
			discount: Joi.number().precision(2).min(0).max(1),
			short_description: Joi.string().trim().min(20).max(300),
			description: Joi.string().min(20).max(2500).required(),
			images: Joi.array().items(Joi.string()),
			meta_title: Joi.string().trim().min(1).max(100).required(),
			meta_description: Joi.string().trim().min(20).max(200),
			meta_keywords: Joi.string().trim().min(1).max(150)
		})
	},
	updateProduct: {
		params: Joi.object({
			productId: Joi.string().guid({ version: 'uuidv4' }).required()
		}),
		body: Joi.object({
			enable: Joi.boolean(),
			name: Joi.string().trim().min(1).max(200).required(),
			category_id: Joi.string().guid({ version: 'uuidv4' }).required(),
			title: Joi.string().trim().min(1).max(200).required(),
			price: Joi.number().precision(3).min(0).required(),
			quantity: Joi.number().integer().min(1).required(),
			discount: Joi.number().precision(2).min(0).max(1),
			short_description: Joi.string().trim().min(20).max(300),
			description: Joi.string().min(20).max(2500).required(),
			images: Joi.array().items(Joi.string()),
			meta_title: Joi.string().trim().min(1).max(100).required(),
			meta_description: Joi.string().trim().min(20).max(200),
			meta_keywords: Joi.string().trim().min(1).max(150)
		})
	},
	deleteProduct: {
		params: Joi.object({
			productId: Joi.string().guid({ version: 'uuidv4' }).required()
		})
	}
}
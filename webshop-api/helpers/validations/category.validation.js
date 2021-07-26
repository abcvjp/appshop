const Joi = require('joi')

module.exports = {
	getCategoryById: {
		params: Joi.object({
			categoryId: Joi.string().guid({ version: 'uuidv4' }).required()
		})
	},
	getCategory: {
		query: Joi.object({
			id: Joi.string().guid({ version: 'uuidv4' }),
			slug: Joi.string().min(1),
			include_products: Joi.string().valid('true', 'false'),
			include_childs: Joi.string().valid('true', 'false')
		}).min(1)
	},
	createCategory: {
		body: Joi.object({
			name: Joi.string().trim().min(1).max(30).required(),
			description: Joi.string().trim().min(20).max(100).required(),
			parent_id: Joi.string().guid({ version: 'uuidv4' }).required(),
			meta_title: Joi.string().trim().min(1).max(100).required(),
			meta_description: Joi.string().trim().min(20).max(200),
			meta_keywords: Joi.string().trim().min(1).max(150)
		})
	},
	updateCategory: {
		params: Joi.object({
			categoryId: Joi.string().guid({ version: 'uuidv4' }).required()
		}),
		body: Joi.object({
			name: Joi.string().trim().min(1).max(30).required(),
			description: Joi.string().trim().min(20).max(100).required(),
			meta_title: Joi.string().trim().min(1).max(100).required(),
			meta_description: Joi.string().trim().min(20).max(200),
			meta_keywords: Joi.string().trim().min(1).max(150)
		})
	},
	deleteCategory: {
		params: Joi.object({
			categoryId: Joi.string().guid({ version: 'uuidv4' }).required()
		})
	}
}
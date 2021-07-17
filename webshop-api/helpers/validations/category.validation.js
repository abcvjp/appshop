const Joi = require('joi')

module.exports = {
	createCategory: {
		body: Joi.object({
			name: Joi.string().trim().min(1).max(30).required(),
			description: Joi.string().trim().min(20).max(100).required(),
			parentId: Joi.number().integer().min(1),
			meta_title: Joi.string().trim().min(1).max(100).required(),
			meta_description: Joi.string().trim().min(20).max(200),
			meta_keywords: Joi.string().trim().min(1).max(150)
		})
	},
	updateCategory: {
		params: Joi.object({
			categoryId: Joi.number().integer().min(1)
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
			categoryId: Joi.number().integer().min(1)
		})
	}
}
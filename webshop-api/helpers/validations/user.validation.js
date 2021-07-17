const Joi = require('joi')

module.exports = {
	signup: {
		body: Joi.object({
			username: Joi.string().alphanum().lowercase().trim().min(4).max(20).required(),
			password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6).max(100).required(),
			fullname: Joi.string().trim().min().min(1).max(50).required(),
			email: Joi.string().trim().email().required()
		})
	},
	login: {
		body: Joi.object({
			username: Joi.string().trim().min(4).max(20).required(),
			password: Joi.string().trim().min(6).max(100).required()
		})
	}
}
const Joi = require('joi').extend(require('@joi/date'))

module.exports = {
	getOrderReport: {
		query: Joi.object({
			start_date: Joi.date().format('YYYY-MM-DD').required(),
			end_date: Joi.date().format('YYYY-MM-DD').required(),
			group_by: Joi.string().trim().valid('day','week','month','year').required(),
			current_page: Joi.number().integer().min(1),
			page_size: Joi.number().integer().min(1),
			sort: Joi.string().trim().min(1),
		})
	}
}
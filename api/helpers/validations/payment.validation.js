const Joi = require('joi');

module.exports = {
  doPaymentByStripe: {
    body: Joi.object({
      order_id: Joi.string().guid({ version: 'uuidv4' }).required(),
	  token_id: Joi.string().required()
    })
  },
};
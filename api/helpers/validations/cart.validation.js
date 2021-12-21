const Joi = require('joi');

module.exports = {
  caculateSubTotal: {
    body: Joi.object({
      cart_items: Joi.array()
        .min(1)
        .items(
          Joi.object({
            product_id: Joi.string().guid({ version: 'uuidv4' }).required(),
            quantity: Joi.number().integer().min(1).required()
          })
        )
        .unique('product_id')
        .required()
    })
  },
  checkCartValid: {
    body: Joi.object({
      cart_items: Joi.array()
        .min(1)
        .items(
          Joi.object({
            product_id: Joi.string().guid({ version: 'uuidv4' }).required(),
            price: Joi.number().precision(2).min(0).required(),
            quantity: Joi.number().integer().min(1).required(),
            product_name: Joi.string().trim().min(1).max(200).required(),
          })
        )
        .unique('product_id')
        .required()
    })
  },
  updateCart: {
    body: Joi.object({
      cart_items: Joi.array()
        .min(0)
        .items(
          Joi.object({
            product_id: Joi.string().guid({ version: 'uuidv4' }).required(),
            price: Joi.number().precision(2).min(0).required(),
            quantity: Joi.number().integer().min(1).required(),
            product_name: Joi.string().trim().min(1).max(200).required(),
            selected: Joi.boolean().required()
          })
        )
        .unique('product_id')
        .required()
    })
  }
};

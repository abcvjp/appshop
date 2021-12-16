const Joi = require('joi');

module.exports = {
  getWishlist: {
    query: Joi.object({
      current_page: Joi.number().integer().min(1),
      page_size: Joi.number().integer().min(1),
    })
  },
  addProductToWishlist: {
    body: Joi.object({
      productId: Joi.string().guid({ version: 'uuidv4' }).required()
    })
  },
  removeProductFromWishlist: {
    body: Joi.object({
      productId: Joi.string().guid({ version: 'uuidv4' }).required()
    })
  },
};
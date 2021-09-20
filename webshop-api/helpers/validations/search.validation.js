const Joi = require("joi");

module.exports = {
  searchProducts: {
    query: Joi.object({
      q: Joi.string().min(4).max(100).required(),
      category_id: Joi.string().guid({ version: "uuidv4" }),
      current_page: Joi.number().integer().min(1),
      page_size: Joi.number().integer().min(1),
      sort: Joi.string().min(1),
      published: Joi.bool(),
      enable: Joi.bool(),
      in_stock: Joi.bool(),
      price: Joi.string().trim(),
    }),
  },
};

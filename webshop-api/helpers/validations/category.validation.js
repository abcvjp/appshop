const Joi = require("joi");

module.exports = {
  getCategories: {
    query: Joi.object({
      current_page: Joi.number().integer().min(1),
      page_size: Joi.number().integer().min(1),
      sort: Joi.string().min(1),
    }),
  },
  getCategoryById: {
    params: Joi.object({
      categoryId: Joi.string().guid({ version: "uuidv4" }).required(),
    }),
  },
  getCategory: {
    query: Joi.object({
      id: Joi.string().guid({ version: "uuidv4" }),
      slug: Joi.string().min(1),
      include_products: Joi.bool(),
      include_childs: Joi.bool(),
    }).min(1),
  },
  createCategory: {
    body: Joi.object({
      name: Joi.string().trim().min(1).max(30).required(),
      description: Joi.string().trim().min(20).max(100).required(),
      parent_id: Joi.string().guid({ version: "uuidv4" }),
      published: Joi.boolean(),
      meta_title: Joi.string().trim().min(1).max(100).required(),
      meta_description: Joi.string().trim().min(20).max(200),
      meta_keywords: Joi.string().trim().min(1).max(150),
    }),
  },
  updateCategory: {
    params: Joi.object({
      categoryId: Joi.string().guid({ version: "uuidv4" }).required(),
    }),
    body: Joi.object({
      name: Joi.string().trim().min(1).max(30).required(),
      description: Joi.string().trim().min(20).max(255).required(),
      published: Joi.boolean(),
      parent_id: Joi.string()
        .guid({ version: "uuidv4" })
        .required()
        .allow(null),
      meta_title: Joi.string().trim().min(1).max(100).required(),
      meta_description: Joi.string().trim().min(20).max(200),
      meta_keywords: Joi.string().trim().min(1).max(150),
    }),
  },
  deleteCategory: {
    params: Joi.object({
      categoryId: Joi.string().guid({ version: "uuidv4" }).required(),
    }),
  },
  deleteCategories: {
    body: Joi.object({
      categoryIds: Joi.array()
        .min(1)
        .items(Joi.string().guid({ version: "uuidv4" }))
        .required(),
    }),
  },
};

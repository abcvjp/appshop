const Joi = require("joi");

module.exports = {
  getProducts: {
    query: Joi.object({
      current_page: Joi.number().integer().min(1),
      page_size: Joi.number().integer().min(1),
      sort: Joi.string().min(1),
      category_id: Joi.string().guid({ version: "uuidv4" }),
      category_slug: Joi.string().min(1),
      enable: Joi.bool(),
      published: Joi.bool(),
      in_stock: Joi.bool(),
      price: Joi.string().trim(),
    }),
  },
  getProduct: {
    query: Joi.object({
      id: Joi.string().guid({ version: "uuidv4" }),
      slug: Joi.string().min(1),
    }).min(1),
  },
  getProductById: {
    params: Joi.object({
      productId: Joi.string().guid({ version: "uuidv4" }).required(),
    }),
  },
  getRelatedProducts: {
    params: Joi.object({
      productId: Joi.string().guid({ version: "uuidv4" }).required(),
    }),
  },
  createProduct: {
    body: Joi.object({
      enable: Joi.boolean(),
      published: Joi.boolean(),
      name: Joi.string().trim().min(1).max(200).required(),
      category_id: Joi.string().guid({ version: "uuidv4" }).required(),
      title: Joi.string().trim().min(1).max(200).required(),
      price: Joi.number().precision(3).min(0).required(),
      root_price: Joi.number().precision(3).min(0).required(),
      quantity: Joi.number().integer().min(1).required(),
      short_description: Joi.string().trim().min(20).max(300).required(),
      description: Joi.string().min(20).max(30000).required(),
      images: Joi.array().items(
        Joi.object({
          url: Joi.string().trim().required().min(10),
          alt: Joi.string().trim().min(10),
          title: Joi.string().trim().min(10),
        })
      ),
      meta_title: Joi.string().trim().min(1).max(100).required(),
      meta_description: Joi.string().trim().min(20).max(200),
      meta_keywords: Joi.string().trim().min(1).max(150),
    }),
  },
  updateProduct: {
    params: Joi.object({
      productId: Joi.string().guid({ version: "uuidv4" }).required(),
    }),
    body: Joi.object({
      enable: Joi.boolean(),
      published: Joi.boolean(),
      name: Joi.string().trim().min(1).max(200),
      category_id: Joi.string().guid({ version: "uuidv4" }),
      title: Joi.string().trim().min(1).max(200),
      price: Joi.number().precision(3).min(0),
      root_price: Joi.number().precision(3).min(0),
      quantity: Joi.number().integer().min(0),
      short_description: Joi.string().trim().min(20).max(300),
      description: Joi.string().min(20).max(30000),
      images: Joi.array().items(
        Joi.object({
          url: Joi.string().trim().required().min(10),
          alt: Joi.string().trim().min(10),
          title: Joi.string().trim().min(10),
        })
      ),
      meta_title: Joi.string().trim().min(1).max(100),
      meta_description: Joi.string().trim().min(20).max(200),
      meta_keywords: Joi.string().trim().min(1).max(150),
    }),
  },
  updateProducts: {
    body: Joi.object({
      products: Joi.array()
        .items(
          Joi.object({
            id: Joi.string().guid({ version: "uuidv4" }).required(),
            enable: Joi.boolean(),
            published: Joi.boolean(),
            name: Joi.string().trim().min(1).max(200),
            category_id: Joi.string().guid({ version: "uuidv4" }),
            title: Joi.string().trim().min(1).max(200),
            price: Joi.number().precision(3).min(0),
            root_price: Joi.number().precision(3).min(0),
            quantity: Joi.number().integer().min(0),
            short_description: Joi.string().trim().min(20).max(300),
            description: Joi.string().min(20).max(2500),
            images: Joi.array().items(
              Joi.object({
                url: Joi.string().trim().required().min(10),
                alt: Joi.string().trim().min(10),
                title: Joi.string().trim().min(10),
              })
            ),
            meta_title: Joi.string().trim().min(1).max(100),
            meta_description: Joi.string().trim().min(20).max(200),
            meta_keywords: Joi.string().trim().min(1).max(150),
          })
        )
        .min(1)
        .required(),
    }),
  },
  deleteProduct: {
    params: Joi.object({
      productId: Joi.string().guid({ version: "uuidv4" }).required(),
    }),
  },
  deleteProducts: {
    body: Joi.object({
      productIds: Joi.array()
        .min(1)
        .items(Joi.string().guid({ version: "uuidv4" }))
        .required(),
    }),
  },
};

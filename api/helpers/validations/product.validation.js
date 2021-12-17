const Joi = require('joi');

module.exports = {
  getProducts: {
    query: Joi.object({
      current_page: Joi.number().integer().min(1).required(),
      page_size: Joi.number().integer().min(1).required(),
      sort: Joi.string().min(1),
      category_id: Joi.string().guid({ version: 'uuidv4' }),
      category_slug: Joi.string().min(1),
      enable: Joi.bool(),
      published: Joi.bool(),
      in_stock: Joi.bool(),
      price: Joi.string().trim()
    })
  },
  getProduct: {
    query: Joi.object({
      id: Joi.string().guid({ version: 'uuidv4' }),
      slug: Joi.string().min(1)
    }).min(1)
  },
  getProductById: {
    params: Joi.object({
      productId: Joi.string().guid({ version: 'uuidv4' }).required()
    })
  },
  getRelatedProducts: {
    params: Joi.object({
      productId: Joi.string().guid({ version: 'uuidv4' }).required()
    })
  },
  createProduct: {
    body: Joi.object({
      enable: Joi.boolean(),
      published: Joi.boolean(),
      name: Joi.string().trim().min(1).max(200).required(),
      category_id: Joi.string().guid({ version: 'uuidv4' }).required(),
      title: Joi.string().trim().min(1).max(255).required(),
      price: Joi.number().precision(2).min(0).required(),
      root_price: Joi.number().precision(2).min(0).required(),
      quantity: Joi.number().integer().min(1).required(),
      short_description: Joi.string().trim().min(20).max(300).required(),
      description: Joi.string().min(20).max(30000).required(),
      preview: Joi.string().trim().required().min(10).max(255).allow(null),
      images: Joi.array()
        .items(
          Joi.object({
            url: Joi.string().trim().required().min(10).max(255),
            alt: Joi.string().trim().min(10).max(255).allow(null),
            title: Joi.string().trim().min(10).max(255).allow(null)
          })
        )
        .allow(null),
      meta_title: Joi.string().trim().min(1).max(150).required(),
      meta_description: Joi.string().trim().min(20).max(255).allow(null),
      meta_keywords: Joi.string().trim().min(1).max(150).allow(null)
    })
  },
  updateProduct: {
    params: Joi.object({
      productId: Joi.string().guid({ version: 'uuidv4' }).required()
    }),
    body: Joi.object({
      enable: Joi.boolean(),
      published: Joi.boolean(),
      name: Joi.string().trim().min(1).max(200),
      category_id: Joi.string().guid({ version: 'uuidv4' }),
      title: Joi.string().trim().min(1).max(255),
      price: Joi.number().precision(2).min(0),
      root_price: Joi.number().precision(2).min(0),
      quantity: Joi.number().integer().min(0),
      short_description: Joi.string().trim().min(20).max(300),
      description: Joi.string().min(20).max(30000),
      preview: Joi.string().trim().required().min(10).max(255).allow(null),
      images: Joi.array()
        .items(
          Joi.object({
            url: Joi.string().trim().required().min(10).max(255),
            alt: Joi.string().trim().min(10).max(255).allow(null),
            title: Joi.string().trim().min(10).max(255).allow(null)
          })
        )
        .allow(null),
      meta_title: Joi.string().trim().min(1).max(150),
      meta_description: Joi.string().trim().min(20).max(255).allow(null),
      meta_keywords: Joi.string().trim().min(1).max(150).allow(null)
    })
  },
  updateProducts: {
    body: Joi.object({
      products: Joi.array()
        .items(
          Joi.object({
            id: Joi.string().guid({ version: 'uuidv4' }).required(),
            enable: Joi.boolean(),
            published: Joi.boolean(),
            name: Joi.string().trim().min(1).max(200),
            category_id: Joi.string().guid({ version: 'uuidv4' }),
            title: Joi.string().trim().min(1).max(255),
            price: Joi.number().precision(2).min(0),
            root_price: Joi.number().precision(2).min(0),
            quantity: Joi.number().integer().min(0),
            short_description: Joi.string().trim().min(20).max(300),
            description: Joi.string().min(20).max(2500),
            preview: Joi.string().trim().required().min(10).max(255).allow(null),
            images: Joi.array()
              .items(
                Joi.object({
                  url: Joi.string().trim().required().min(10).max(255),
                  alt: Joi.string().trim().min(10).max(255).allow(null),
                  title: Joi.string().trim().min(10).max(255).allow(null)
                })
              )
              .allow(null),
            meta_title: Joi.string().trim().min(1).max(150),
            meta_description: Joi.string().trim().min(20).max(255).allow(null),
            meta_keywords: Joi.string().trim().min(1).max(150).allow(null)
          })
        )
        .min(1)
        .required()
    })
  },
  deleteProduct: {
    params: Joi.object({
      productId: Joi.string().guid({ version: 'uuidv4' }).required()
    })
  },
  deleteProducts: {
    body: Joi.object({
      productIds: Joi.array()
        .min(1)
        .items(Joi.string().guid({ version: 'uuidv4' }))
        .required()
    })
  },
  reviewProduct: {
    params: Joi.object({
      productId: Joi.string().guid({ version: 'uuidv4' }).required()
    }),
    body: Joi.object({
      star: Joi.number().integer().min(1).max(5),
      comment: Joi.string().trim().min(30).max(300)
    })
  },
  getProductReviews: {
    params: Joi.object({
      productId: Joi.string().guid({ version: 'uuidv4' }).required()
    }),
    query: Joi.object({
      current_page: Joi.number().integer().min(1).required(),
      page_size: Joi.number().integer().min(1).required(),
      sort: Joi.string().min(1)
    })
  }
};

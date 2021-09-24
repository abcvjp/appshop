const createProduct = require('./operations/createProduct');
const deleteProduct = require('./operations/deleteProduct');
const deleteProducts = require('./operations/deleteProducts');
const getProduct = require('./operations/getProduct');
const getProductById = require('./operations/getProductById');
const getProducts = require('./operations/getProducts');
const searchProducts = require('./operations/searchProducts');
const updateProduct = require('./operations/updateProduct');
const updateProducts = require('./operations/updateProducts');

module.exports = {
  '/product/{productId}': {
    get: getProductById,
    put: updateProduct,
    delete: deleteProduct
  },
  '/product/all': {
    get: getProducts
  },
  '/product': {
    get: getProduct,
    post: createProduct,
    put: updateProducts,
    delete: deleteProducts
  },
  '/search': {
    get: searchProducts
  }
};

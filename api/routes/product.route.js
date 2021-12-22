var express = require('express');
var router = express.Router();
const productController = require('../controllers/product.controller');
const productValidation = require('../helpers/validations/product.validation');

const { authenticate, authorizeRole } = require('../controllers/auth.controller');
const Role = require('../helpers/roles.helper');
const { validate } = require('../helpers/validator.helper');

router.get(
  '/all',
  validate(productValidation.getProducts),
  authenticate({ required: false }),
  productController.getProducts
);
router.get(
  '/recent',
  validate(productValidation.getRecentProducts),
  productController.getRecentProducts
);
router.get(
  '/:productId/related',
  validate(productValidation.getRelatedProducts),
  productController.getRelatedProducts
);
router.get(
  '/',
  validate(productValidation.getProduct),
  productController.getProduct
);
router.post(
  '/:productId/review',
  validate(productValidation.reviewProduct),
  authenticate({ required: true }),
  productController.reviewProduct
);
router.post(
  '/',
  validate(productValidation.createProduct),
  authenticate({ required: true }),
  authorizeRole(Role.Admin),
  productController.createProduct
);
router.get(
  '/:productId/related',
  validate(productValidation.getRelatedProducts),
  productController.getRelatedProducts
);
router.get(
  '/:productId/review',
  validate(productValidation.getProductReviews),
  productController.getProductReviews
);
router.get(
  '/:productId',
  validate(productValidation.getProductById),
  productController.getProductById
);
router.put(
  '/',
  validate(productValidation.updateProducts),
  authenticate({ required: true }),
  authorizeRole(Role.Admin),
  productController.updateProducts
);
router.put(
  '/:productId',
  validate(productValidation.updateProduct),
  authenticate({ required: true }),
  authorizeRole(Role.Admin),
  productController.updateProduct
);
router.delete(
  '/',
  validate(productValidation.deleteProducts),
  authenticate({ required: true }),
  authorizeRole(Role.Admin),
  productController.deleteProducts
);
router.delete(
  '/:productId',
  validate(productValidation.deleteProduct),
  authenticate({ required: true }),
  authorizeRole(Role.Admin),
  productController.deleteProduct
);

module.exports = router;

var express = require("express");
var router = express.Router();
const productController = require("../controllers/product.controller");
const productValidation = require("../helpers/validations/product.validation");

const { authenticate, authorize } = require("../controllers/user.controller");
const Role = require("../helpers/roles.helper");
const { validate } = require("../helpers/validator.helper");

router.get(
  "/all",
  validate(productValidation.getProducts),
  authenticate({ required: false }),
  productController.getProducts
);
router.get(
  "/",
  validate(productValidation.getProduct),
  productController.getProduct
);
router.post(
  "/",
  authenticate({ required: true }),
  authorize(Role.Admin),
  validate(productValidation.createProduct),
  productController.createProduct
);
router.get(
  "/:productId/related",
  validate(productValidation.getRelatedProducts),
  productController.getRelatedProducts
);
router.get(
  "/:productId",
  validate(productValidation.getProductById),
  productController.getProductById
);
router.put(
  "/",
  authenticate({ required: true }),
  authorize(Role.Admin),
  validate(productValidation.updateProducts),
  productController.updateProducts
);
router.put(
  "/:productId",
  authenticate({ required: true }),
  authorize(Role.Admin),
  validate(productValidation.updateProduct),
  productController.updateProduct
);
router.delete(
  "/",
  authenticate({ required: true }),
  authorize(Role.Admin),
  validate(productValidation.deleteProducts),
  productController.deleteProducts
);
router.delete(
  "/:productId",
  authenticate({ required: true }),
  authorize(Role.Admin),
  validate(productValidation.deleteProduct),
  productController.deleteProduct
);

module.exports = router;

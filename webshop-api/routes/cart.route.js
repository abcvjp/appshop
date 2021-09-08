var express = require("express");
var router = express.Router();
const cartController = require("../controllers/cart.controller");
const cartValidation = require("../helpers/validations/cart.validation");
const { validate } = require("../helpers/validator.helper");

router.post(
  "/subtotal",
  validate(cartValidation.caculateSubTotal),
  cartController.caculateSubTotal
);
router.post(
  "/check_valid",
  validate(cartValidation.checkCartValid),
  cartController.checkCartValid
);

module.exports = router;

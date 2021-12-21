var express = require('express');
const { authenticate } = require('../controllers/auth.controller');
var router = express.Router();
const cartController = require('../controllers/cart.controller');
const cartValidation = require('../helpers/validations/cart.validation');
const { validate } = require('../helpers/validator.helper');

router.get(
  '/',
  authenticate({ required: true }),
  cartController.getCart
);

router.post(
  '/subtotal',
  validate(cartValidation.caculateSubTotal),
  cartController.caculateSubTotal
);

router.post(
  '/check-valid',
  validate(cartValidation.checkCartValid),
  cartController.checkCartValid
);

router.put(
  '/',
  validate(cartValidation.updateCart),
  authenticate({ required: true }),
  cartController.updateCart
)

module.exports = router;

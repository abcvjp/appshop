var express = require('express');
var router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');
const wishlistValidation = require('../helpers/validations/wishlist.validation');

const { authenticate } = require('../controllers/auth.controller');
const { validate } = require('../helpers/validator.helper');

router.get(
  '/',
  validate(wishlistValidation.getWishlist),
  authenticate({ required: true }),
  wishlistController.getWishList
);

router.post(
  '/',
  validate(wishlistValidation.addProductToWishlist),
  authenticate({ required: true }),
  wishlistController.addProductToWishlist
);

router.delete(
  '/',
  validate(wishlistValidation.removeProductFromWishlist),
  authenticate({ required: true }),
  wishlistController.removeProductFromWishlist
);

module.exports = router;

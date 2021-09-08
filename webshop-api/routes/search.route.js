var express = require("express");
var router = express.Router();
const searchController = require("../controllers/search.controller");
const searchValidation = require("../helpers/validations/search.validation");

const { authenticate } = require("../controllers/user.controller");
const { validate } = require("../helpers/validator.helper");

router.get(
  "/",
  validate(searchValidation.searchProducts),
  authenticate({ required: false }),
  searchController.searchProducts
);

module.exports = router;

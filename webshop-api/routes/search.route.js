var express = require('express')
var router = express.Router()
const searchController = require('../controllers/search.controller')
const searchValidation = require('../helpers/validations/search.validation')
const { validate } = require('express-validation')

router.get('/', validate(searchValidation.searchProducts), searchController.searchProducts)

module.exports = router
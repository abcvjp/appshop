var express = require('express')
var router = express.Router()
const cartController = require('../controllers/cart.controller')
// const categoryValidation = require('../helpers/validations/cart.validation')
const { validate } = require('express-validation')

router.get('/subtotal', cartController.caculateSubTotal)
router.get('/check_valid', cartController.checkCartValid)

module.exports = router
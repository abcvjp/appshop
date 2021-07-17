var express = require('express')
var router = express.Router()
const productController = require('../controllers/product.controller')
const productValidation = require('../helpers/validations/product.validation')
const { validate } = require('express-validation')

router.get('/', productController.getProduct)
router.post('/', validate(productValidation.createProduct), productController.createProduct)
router.get('/:productId', productController.getProductById)
router.put('/:productId', validate(productValidation.updateProduct), productController.updateProduct)
router.delete('/:productId', validate(productValidation.deleteProduct), productController.deleteProduct)

module.exports = router
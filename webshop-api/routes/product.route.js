var express = require('express')
var router = express.Router()
const productController = require('../controllers/product.controller')
const productValidation = require('../helpers/validations/product.validation')
const { validate } = require('express-validation')

router.get('/all', validate(productValidation.getProducts), productController.getProducts)
router.get('/', validate(productValidation.getProduct), productController.getProduct)
router.post('/', validate(productValidation.createProduct), productController.createProduct)
router.get('/:productId', validate(productValidation.getProductById), productController.getProductById)
router.put('/', validate(productValidation.updateProducts), productController.updateProducts)
router.put('/:productId', validate(productValidation.updateProduct), productController.updateProduct)
router.delete('/', validate(productValidation.deleteProducts), productController.deleteProducts)
router.delete('/:productId', validate(productValidation.deleteProduct), productController.deleteProduct)

module.exports = router
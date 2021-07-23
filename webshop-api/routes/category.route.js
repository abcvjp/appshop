var express = require('express')
var router = express.Router()
const categoryController = require('../controllers/category.controller')
const categoryValidation = require('../helpers/validations/category.validation')
const { validate } = require('express-validation')

router.get('/all', categoryController.getCategories)
router.get('/', validate(categoryValidation.getCategory), categoryController.getCategory)
router.post('/', validate(categoryValidation.createCategory), categoryController.createCategory)
router.get('/:categoryId', validate(categoryValidation.getCategoryById), categoryController.getCategoryById)
router.put('/:categoryId', validate(categoryValidation.updateCategory), categoryController.updateCategory)
router.delete('/:categoryId', validate(categoryValidation.deleteCategory), categoryController.deleteCategory)

module.exports = router
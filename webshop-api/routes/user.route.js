var express = require('express')
var router = express.Router()
const userController = require('../controllers/user.controller')
const { validate } = require('express-validation')
const userValidation = require('../helpers/validations/user.validation')

router.get('/', userController.authenticate, userController.getAll)
router.post('/signup', validate(userValidation.signup), userController.signup)
router.post('/login', validate(userValidation.login), userController.login)
router.get('/logout', userController.logout)
router.get('/:userId', validate(userValidation.getUserById), userController.getUserById)

module.exports = router

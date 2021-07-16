var express = require('express')
var router = express.Router()
const userMiddleware = require('../middlewares/user.middleware')

router.get('/', userMiddleware.authenticate, userMiddleware.getAll)
router.post('/signup', userMiddleware.signup)
router.post('/login', userMiddleware.login)
router.get('/logout', userMiddleware.logout)
router.get('/:username', userMiddleware.getOneByName)

module.exports = router

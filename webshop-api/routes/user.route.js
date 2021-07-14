var express = require('express')
var router = express.Router()
const userMiddleware = require('../middlewares/user.middleware')

router.get('/', userMiddleware.getAll)


module.exports = router

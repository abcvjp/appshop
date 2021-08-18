var express = require('express')
var router = express.Router()
const reportController = require('../controllers/report.controller')
const reportValidation = require('../helpers/validations/report.validation')
const { validate } = require('express-validation')

router.get('/order', validate(reportValidation.getOrderReport), reportController.getOrderReport)

module.exports = router
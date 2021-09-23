var express = require('express');
var router = express.Router();
const reportController = require('../controllers/report.controller');
const reportValidation = require('../helpers/validations/report.validation');

const { authenticate, authorize } = require('../controllers/user.controller');
const Role = require('../helpers/roles.helper');
const { validate } = require('express-validation');

router.get(
  '/order',
  authenticate({ required: true }),
  authorize(Role.Admin),
  validate(reportValidation.getOrderReport),
  reportController.getOrderReport
);

module.exports = router;

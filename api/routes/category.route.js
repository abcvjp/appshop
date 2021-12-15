var express = require('express');
var router = express.Router();
const categoryController = require('../controllers/category.controller');
const categoryValidation = require('../helpers/validations/category.validation');

const { authenticate, authorizeRole } = require('../controllers/auth.controller');
const Role = require('../helpers/roles.helper');
const { validate } = require('../helpers/validator.helper');

router.get(
  '/all',
  authenticate({ required: false }),
  categoryController.getCategories
);
router.get(
  '/',
  validate(categoryValidation.getCategory),
  categoryController.getCategory
);
router.post(
  '/',
  authenticate({ required: true }),
  authorizeRole(Role.Admin),
  validate(categoryValidation.createCategory),
  categoryController.createCategory
);
router.get(
  '/:categoryId',
  validate(categoryValidation.getCategoryById),
  categoryController.getCategoryById
);
router.put(
  '/:categoryId',
  authenticate({ required: true }),
  authorizeRole(Role.Admin),
  validate(categoryValidation.updateCategory),
  categoryController.updateCategory
);
router.delete(
  '/',
  authenticate({ required: true }),
  authorizeRole(Role.Admin),
  validate(categoryValidation.deleteCategories),
  categoryController.deleteCategories
);
router.delete(
  '/:categoryId',
  authenticate({ required: true }),
  authorizeRole(Role.Admin),
  validate(categoryValidation.deleteCategory),
  categoryController.deleteCategory
);

module.exports = router;

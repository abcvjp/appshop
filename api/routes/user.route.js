var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');
const { validate } = require('../helpers/validator.helper');
const userValidation = require('../helpers/validations/user.validation');
const { authenticate, authorizeRole, authorizationController } = require('../controllers/auth.controller');
const Role = require('../helpers/roles.helper');

router.get(
  '/all',
  authenticate({ required: true }),
  authorizeRole(Role.Admin),
  userController.getUsers
);
router.post('/signup', validate(userValidation.signup), userController.signup);
router.post('/login', validate(userValidation.login), userController.login);
router.post('/login-with-firebase', validate(userValidation.loginWithFirebase), userController.loginWithFirebase);
router.get('/refresh-token', validate(userValidation.refreshToken), userController.refreshToken);
router.get('/logout', authenticate({ required: true }), userController.logout);
router.get(
  '/:userId',
  validate(userValidation.getUserById),
  authorizationController.getUserById,
  userController.getUserById
);
router.put(
  '/:userId',
  authenticate({ required: true }),
  validate(userValidation.updateUserInfo),
  authorizationController.updateUserInfo,
  userController.updateUserInfo
);
router.delete(
  '/:userId',
  authenticate({ required: true }),
  validate(userValidation.deleteUser),
  authorizationController.deleteUser,
  userController.deleteUser
);
router.delete(
  '/',
  authenticate({ required: true }),
  authorizeRole(Role.Admin),
  validate(userValidation.deleteUsers),
  userController.deleteUsers
);
router.post(
  '/:userId/reset-password',
  authenticate({ required: true }),
  validate(userValidation.resetPassword),
  userController.resetPassword
);
router.post(
  '/:userId/enable',
  authenticate({ required: true }),
  authorizeRole(Role.Admin),
  validate(userValidation.enableUser),
  userController.enableUser
);
router.post(
  '/:userId/disable',
  authenticate({ required: true }),
  authorizeRole(Role.Admin),
  validate(userValidation.disableUser),
  userController.disableUser
);

module.exports = router;

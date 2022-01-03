var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');
const { validate } = require('../helpers/validator.helper');
const userValidation = require('../helpers/validations/user.validation');
const { authenticate, authorizeRole, authorizationController, authorizeOwner } = require('../controllers/auth.controller');
const Role = require('../helpers/roles.helper');
const { ResourceType } = require('../helpers');

router.get(
  '/all',
  authenticate({ required: true }),
  authorizeRole(Role.Admin),
  userController.getUsers
);
router.post(
  '/signup',
  validate(userValidation.signup),
  userController.signup
);
router.post(
  '/login',
  validate(userValidation.login),
  userController.login
);
router.post(
  '/login-with-firebase',
  validate(userValidation.loginWithFirebase),
  userController.loginWithFirebase
);
router.get(
  '/refresh-token',
  validate(userValidation.refreshToken),
  userController.refreshToken
);
router.get(
  '/logout',
  authenticate({ required: true }),
  userController.logout
);
router.get(
  '/:userId',
  validate(userValidation.getUserById),
  authenticate({ required: true }),
  authorizationController.getUserById,
  userController.getUserById
);
router.get(
  '/',
  authenticate({ required: true }),
  userController.getMe
);
router.put(
  '/password',
  validate(userValidation.resetPassword),
  authenticate({ required: true }),
  userController.resetPassword
);
router.put(
  '/:userId',
  authenticate({ required: true }),
  validate(userValidation.updateUserInfoById),
  authorizationController.updateUserInfoById,
  userController.updateUserInfoById
);
router.put(
  '',
  authenticate({ required: true }),
  validate(userValidation.updateUserInfo),
  authorizeOwner(ResourceType.User),
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
  '/password',
  validate(userValidation.createPassword),
  authenticate({ required: true }),
  userController.createPassword
);
router.post(
  '/enable',
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

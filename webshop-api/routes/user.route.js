var express = require("express");
var router = express.Router();
const userController = require("../controllers/user.controller");
const { validate } = require("../helpers/validator.helper");
const userValidation = require("../helpers/validations/user.validation");
const { authenticate, authorize } = require("../controllers/user.controller");
const Role = require("../helpers/roles.helper");

router.get(
  "/",
  authenticate({ required: true }),
  authorize(Role.Admin),
  userController.getAll
);
router.post("/signup", validate(userValidation.signup), userController.signup);
router.post("/login", validate(userValidation.login), userController.login);
router.get("/refresh_token", userController.refreshToken);
router.get("/logout", authenticate({ required: true }), userController.logout);
router.get(
  "/:userId",
  validate(userValidation.getUserById),
  userController.getUserById
);

module.exports = router;

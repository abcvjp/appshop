const userService = require('../services/user.service');
const createError = require('http-errors');
const asyncHandler = require('express-async-handler');

const { checkPermissionByOwnership, checkPermissionByRole } = require('../services/auth.service');

const { ResourceType, Role } = require('../helpers');

exports.authenticate = ({ required }) =>
  asyncHandler(async (req, res, next) => {
    const headerToken = req.headers.authorization;
    if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
      throw createError(401, 'Invalid token');
    }
    const access_token = headerToken ? headerToken.split(" ")[1] : null;
    if (access_token) {
      const user = await userService.authenticate({ access_token });
      req.user = user ? user : null;
      if (required === true && !user) {
        throw createError(403, 'Authentication failed');
      }
    } else if (required === true) {
      throw createError(401, 'You must login to get access');
    }
    next();
  });

exports.authorizeRole = (roles = []) =>
  asyncHandler(async (req, res, next) => {
    const user = req.user;
    if (!user) throw createError(500, 'User to be authorized does not exist');
	
	if (typeof roles === 'string') {
		roles = [roles];
	}
    if (!(await checkPermissionByRole({ user, roles: [...roles] }))) {
      // user's role is not authorized
      throw createError(403, `You don't have permission to access this`);
    } else {
    	next();
	}

  });

exports.authorizeOwner = (resourceType, resourceId) =>
  asyncHandler(async (req, res, next) => {
    const user = req.user;
    if (!user) throw createError(500, 'User to be authorized does not exist');

	if (!(await checkPermissionByOwnership({
		user,
		resourceId,
		resourceType
	}))) {
		throw createError(403, `You don't have permission to access this`);
	} else {
		next()
	}
  });

const authorizationController = {}

authorizationController.multipleAuthorization = (authorizeServices = []) =>
  asyncHandler(async (req, res, next) => {
    const user = req.user;
    if (!user) throw createError(500, 'User to be authorized does not exist');

	const authResult = await authorizeServices.some(authorizeService => authorizeService());
	if (!authResult) {
		throw createError(403, `You don't have permission to access this`);
	}

	next();
  });

authorizationController.getUserById = asyncHandler(async (req, res, next) => {
	const user = req.user;
	const userId = req.params;

	if (
		!(await checkPermissionByOwnership({
			user,
			resourceId: userId,
			resourceType: ResourceType.User
		}))
			&&
		!(await checkPermissionByRole({
			user,
			roles: Role.Admin
		}))
	) {
		throw createError(403, `You don't have permission to access this`);
	}

	next();
});

authorizationController.updateUserInfo = asyncHandler(async (req, res, next) => {
	const user = req.user;
	const userId = req.params;

	if (
		!(await checkPermissionByOwnership({
			user,
			resourceId: userId,
			resourceType: ResourceType.User
		}))
			&&
		!(await checkPermissionByRole({
			user,
			roles: Role.Admin
		}))
	) {
		throw createError(403, `You don't have permission to access this`);
	}

	next();
});

authorizationController.deleteUser = asyncHandler(async (req, res, next) => {
	const user = req.user;
	const userId = req.params;

	if (
		!(await checkPermissionByOwnership({
			user,
			resourceId: userId,
			resourceType: ResourceType.User
		}))
			&&
		!(await checkPermissionByRole({
			user,
			roles: Role.Admin
		}))
	) {
		throw createError(403, `You don't have permission to access this`);
	}

	next();
});

authorizationController.getOrderById = asyncHandler(async (req, res, next) => {
	const user = req.user;
	const orderId = req.params;

	if (
		!(await checkPermissionByOwnership({
			user,
			resourceId: orderId,
			resourceType: ResourceType.Order
		}))
			&&
		!(await checkPermissionByRole({
			user,
			roles: Role.Admin
		}))
	) {
		throw createError(403, `You don't have permission to access this`);
	}

	next();
});

authorizationController.cancelOrder = asyncHandler(async (req, res, next) => {
	const user = req.user;
	const orderId = req.params;

	if (
		!(await checkPermissionByOwnership({
			user,
			resourceId: orderId,
			resourceType: ResourceType.Order
		}))
			&&
		!(await checkPermissionByRole({
			user,
			roles: Role.Admin
		}))
	) {
		throw createError(403, `You don't have permission to access this`);
	}

	next();
});

authorizationController.getOrdersByUserId = asyncHandler(async (req, res, next) => {
	const user = req.user;
	const { userId } = req.params;

	if (
		!(await checkPermissionByOwnership({
			user,
			resourceId: userId,
			resourceType: ResourceType.User
		}))
			&&
		!(await checkPermissionByRole({
			user,
			roles: Role.Admin
		}))
	) {
		throw createError(403, `You don't have permission to access this`);
	}

	next();
});

exports.authorizationController = authorizationController;
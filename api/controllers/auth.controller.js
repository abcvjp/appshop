const userService = require('../services/user.service');
const createError = require('http-errors');
const asyncHandler = require('express-async-handler');
const Role = require('../helpers/roles.helper');

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
    if (roles.length && !roles.includes(req.user.role)) {
      // user's role is not authorized
      throw createError(403, `You don't have permission to access this`);
    }
    next();
  });

exports.authorizeOwner = (resourceType, resourceId) =>
  asyncHandler(async (req, res, next) => {
    const user = req.user;
    
  });
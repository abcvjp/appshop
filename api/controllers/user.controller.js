const userService = require('../services/user.service');
const createError = require('http-errors');
const asyncHandler = require('express-async-handler');
const Role = require('../helpers/roles.helper');

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const result = await userService.login({ email, password });
  if (result.success) {
    // res.cookie('access_token', result.access_token, { httpOnly: true });
    // res.cookie('refresh_token', result.refresh_token, {
      // httpOnly: true,
      // path: '/user'
    // });
  }
  res.status(200).json(result);
});

exports.loginWithFirebase = asyncHandler(async (req, res, next) => {
  const { idToken } = req.body;
  const result = await userService.loginWithFirebase({ idToken });
  res.status(200).json(result);
})

exports.signup = asyncHandler(async (req, res, next) => {
  const { username, password, email, phone_number, full_name } = req.body;
  const result = await userService.signup({
    username,
    password,
    email,
    phone_number,
    full_name
  });
  res.status(200).json(result);
});

exports.logout = asyncHandler(async (req, res, next) => {
  const { user } = req;
  if (user) {
    await userService.deleteRefreshToken({ user });
    // res.clearCookie('access_token');
    // res.clearCookie('refresh_token');
    res.status(200).json({ success: true });
  } else {
    throw createError(409, 'You are not logged in');
  }
});

exports.refreshToken = asyncHandler(async (req, res, next) => {
  const { refresh_token } = req.cookies;
  if (refresh_token) {
    const result = await userService.refreshToken({ refresh_token });
    // res.cookie('access_token', result.access_token, { httpOnly: true });
    // res.cookie('refresh_token', result.refresh_token, {
      // httpOnly: true,
      // path: '/user'
    // });
    res.status(200).json(result);
  } else {
    throw createError(400, 'You do not have refresh token');
  }
});

exports.getUsers = asyncHandler(async (req, res, next) => {
  const {
    current_page,
    page_size,
    sort,
    id,
    email,
    username,
    full_name,
    phone_number,
    role,
    enable
  } = req.query;
  const result = await userService.getUsers({
    current_page,
    page_size,
    sort,
    id,
    email,
    username,
    full_name,
    phone_number,
    role,
    enable
  });
  res.status(200).json(result);
});

exports.getUserById = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const result = await userService.getUserById({ id: userId });
  res.status(200).json(result);
});

exports.updateUserInfo = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  if (!(req.user.id === userId || req.user.role === Role.Admin)) {
    throw createError(403, "You don't have permission to perform this");
  }
  const { username, full_name, email, phone_number, avatar, enable } = req.body;
  const result = await userService.updateUserInfo({
    id: userId,
    username,
    full_name,
    email,
    phone_number,
    avatar,
    enable
  });
  res.status(200).json(result);
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  if (!(req.user.id === userId || req.user.role === Role.Admin)) {
    throw createError(403, "You don't have permission to perform this");
  }
  const result = await userService.deleteUser({ id: userId });
  res.status(200).json(result);
});

exports.deleteUsers = asyncHandler(async (req, res, next) => {
  const { userIds } = req.body;
  const result = await userService.deleteUsers({ userIds });
  res.status(200).json(result);
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  if (req.user.id !== userId) {
    throw createError(403, "You don't have permission to perform this");
  }
  const { current_password, new_password } = req.body;
  const result = await userService.resetPassword({
    id: userId,
    current_password,
    new_password
  });
  res.status(200).json(result);
});

exports.authenticate = ({ required }) =>
  asyncHandler(async (req, res, next) => {
    const headerToken = req.headers.authorization;
    if (!headerToken) {
      throw createError(401, 'No token provided');
    }
    if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
      throw createError(401, 'Invalid token');
    }
    const access_token = headerToken.split(" ")[1];
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

exports.authorize = (roles = []) =>
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

exports.enableUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  if (req.user.role !== Role.Admin) {
    throw createError(403, "You don't have permission to perform this");
  }
  const result = await userService.enableUser({ id: userId });
  res.status(200).json(result);
});

exports.disableUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  if (req.user.role !== Role.Admin) {
    throw createError(403, "You don't have permission to perform this");
  }
  const result = await userService.disableUser({ id: userId });
  res.status(200).json(result);
});

exports.checkLockUser = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) throw createError(500, 'User to be checked (lock) does not exist');
  if (req.user.enable === false)
    throw createError(403, 'Your account is locked');
  next();
});

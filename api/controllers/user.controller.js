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
  const { username, password, email, phone_number, full_name, address } = req.body;
  const result = await userService.signup({
    username,
    password,
    email,
    phone_number,
    full_name,
    address
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
  const { refresh_token } = req.body;
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

exports.getMe = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const result = await userService.getUserById({ id: userId });
  res.status(200).json(result);
});

exports.updateUserInfo = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const { username, full_name, email, phone_number, avatar, address } = req.body;
  const result = await userService.updateUserInfo({
    id,
    username,
    full_name,
    email,
    phone_number,
    avatar,
    address
  });
  res.status(200).json(result);
});

exports.updateUserInfoById = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const { username, full_name, email, phone_number, avatar, address, enable } = req.body;
  const result = await userService.updateUserInfo({
    id: userId,
    username,
    full_name,
    email,
    phone_number,
    avatar,
    address,
    enable
  });
  res.status(200).json(result);
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const result = await userService.deleteUser({ id: userId });
  res.status(200).json(result);
});

exports.deleteUsers = asyncHandler(async (req, res, next) => {
  const { userIds } = req.body;
  const result = await userService.deleteUsers({ userIds });
  res.status(200).json(result);
});

exports.createPassword = asyncHandler(async (req, res, next) => {
  const user_id = req.user.id;
  const { password } = req.body;
  const result = await userService.createPassword({
    user_id,
    password
  });
  res.status(200).json(result);
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const user_id = req.user.id;
  const { current_password, new_password } = req.body;
  const result = await userService.resetPassword({
    user_id,
    current_password,
    new_password
  });
  res.status(200).json(result);
});

exports.enableUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const result = await userService.enableUser({ id: userId });
  res.status(200).json(result);
});

exports.disableUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
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

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const result = await userService.forgotPassword({ email });
  res.status(200).json(result);
});
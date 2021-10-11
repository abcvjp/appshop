const jwt = require('jsonwebtoken');
const { uuid } = require('uuidv4');
const config = require('../config');
const createError = require('http-errors');

const generateAccessToken = (data) => {
  return jwt.sign(
    data,
    config.get('jwt.secret'),
    config.get('jwt.secret_options')
  );
};

const generateRefreshToken = (data) => {
  return jwt.sign(
    data,
    config.get('jwt.refresh_secret'),
    config.get('jwt.refresh_secret_options')
  );
};

const generateAccessTokenByUser = (user) => {
  const { id, email, username, role } = user;
  const access_token_id = uuid();
  return generateAccessToken({
    id,
    username,
    email,
    role,
    access_token_id
  });
};

const generateRefreshTokenByUser = (user) => {
  const { id, email, username, role } = user;
  const refresh_token_id = uuid();
  return generateRefreshToken({
    id,
    username,
    email,
    role,
    refresh_token_id
  });
};

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, config.get('jwt.secret'));
  } catch (err) {
    throw createError(400, 'Invalid access token');
  }
};

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, config.get('jwt.refresh_secret'));
  } catch (err) {
    throw createError(400, 'Invalid refresh token');
  }
};

module.exports = {
  generateAccessToken,
  generateAccessTokenByUser,
  verifyAccessToken,
  generateRefreshToken,
  generateRefreshTokenByUser,
  verifyRefreshToken
};

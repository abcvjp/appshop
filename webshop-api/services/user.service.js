const User = require("../models").User;
const createError = require("http-errors");
const { Bcrypt, JWT } = require("../helpers");
const { uuid } = require("uuidv4");
const { Op } = require("../models").Sequelize

exports.login = async ({ username, password }) => {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw createError(409, "User doesn't exist");
    }
    if (Bcrypt.verifyPassword(password, user.hash)) {
      const { id, email, role, full_name, avatar } = user;
      const access_token_id = uuid();
      const access_token = JWT.generateAccessToken({
        username,
        role,
        access_token_id,
      });
      const refresh_token_id = uuid();
      const refresh_token = JWT.generateRefreshToken({
        username,
        role,
        refresh_token_id,
      });
      await user.update({
        refresh_token,
      });
      return {
        success: true,
        user: {
          id,
          username,
          full_name,
          email,
          role,
          avatar,
        },
        access_token,
        refresh_token,
      };
    } else {
      throw createError(401, "Password is incorrect");
    }
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.signup = async ({ username, password, email, full_name }) => {
  try {
    const userFromServer = await User.findOne({
      where: {
        [Op.or]: [
          { username },
          { email }
        ]
      }
    });
    if (userFromServer) {
      if (userFromServer.username === username) {
        throw createError(409, "Username already exists");
      }
      if (userFromServer.email === email) {
        throw createError(409, "Email already exists");
      }
    }
    const id = uuid();
    const hash = Bcrypt.hashPassword(password);
    const newUser = await User.create({
      id,
      username,
      hash,
      email,
      full_name,
    });
    return {
      success: true,
      user: {
        username,
        full_name,
        email,
        role: newUser.role,
      },
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.refreshToken = async ({ refresh_token }) => {
  try {
    const user = await JWT.verifyRefreshToken(refresh_token);
    if (!user) {
      throw createError(401, "Refresh token is not valid");
    }
    const { username, email, role } = user;
    const access_token_id = uuid();
    const newAccessToken = JWT.generateAccessToken({
      username,
      email,
      role,
      access_token_id,
    });
    const refresh_token_id = uuid();
    const newRefreshToken = JWT.generateRefreshToken({
      username,
      email,
      role,
      refresh_token_id,
    });
    await User.update(
      {
        refresh_token: newRefreshToken
      },
      {
        where: {
          username
        }
      }
    );
    return {
      success: true,
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.deleteRefreshToken = async ({ user }) => {
  try {
    const userInDb = await User.findOne({ username: user.username });
    await userInDb.update({ refresh_token: null });
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.authenticate = async ({ access_token }) => {
  try {
    const user = JWT.verifyAccessToken(access_token);
    if (user) {
      return user;
    } else {
      throw createError(401, "Acess token is not valid");
    }
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.getUserById = async ({ id }) => {
  try {
    const userById = await User.findOne({
      where: { id },
      attributes: {
        exclude: ["refresh_token", "hash"],
      },
    });
    if (!userById) throw createError(404, "User does not exist");
    return {
      success: true,
      data: userById,
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.getAll = async () => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["refresh_token", "hash"],
      },
    });
    if (!users) throw createError(404, "Can not find any user");
    return {
      success: true,
      data: users,
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

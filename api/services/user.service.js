const User = require('../models').User;
const createError = require('http-errors');
const { Bcrypt, JWT } = require('../helpers');
const { uuid } = require('uuidv4');
const { Op } = require('../models').Sequelize;
const { calculateLimitAndOffset, paginate } = require('paginate-info');
const { forgotPasswordMailQueue } = require('../queues');

const firebase = require("../firebase");

exports.login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw createError(404, "User doesn't exist");
    }
    if (user.enable === false) {
      throw createError(403, 'Your account is locked');
    }
    if (Bcrypt.verifyPassword(password, user.hash)) {
      const access_token = JWT.generateAccessTokenByUser(user);
      const refresh_token = JWT.generateRefreshTokenByUser(user);
      await user.update({
        refresh_token
      });
      const {
        id,
        email,
        username,
        phone_number,
        role,
        enable,
        full_name,
        avatar,
        address
      } = user;
      return {
        success: true,
        user: {
          id,
          username,
          full_name,
          email,
          phone_number,
          role,
          enable,
          avatar,
          address,
          has_password: true
        },
        access_token,
        refresh_token
      };
    } else {
      throw createError(401, 'Password is incorrect');
    }
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.loginWithFirebase = async ({ idToken }) => {
  try {
    let decodedToken = await firebase.auth().verifyIdToken(idToken);
    const userRecord = await firebase.auth().getUser(decodedToken.uid);
    const email = userRecord.email || userRecord.providerData[0].email;
    if (!email) throw createError(401, 'This login does not contain email');
    let user = await User.findOne({
      where: { email }
    });
    if (!user) {
      // create new user if email not exists
      user = await User.create({
        id: uuid(),
        email,
        phone_number: userRecord.phoneNumber,
        full_name: userRecord.displayName,
        avatar: userRecord.photoURL
      });
    }
    const access_token = JWT.generateAccessTokenByUser(user);
    const refresh_token = JWT.generateRefreshTokenByUser(user);
    user = await user.update({
      refresh_token
    });
    const {
      id,
      username,
      phone_number,
      role,
      enable,
      full_name,
      avatar,
      hash,
      address
    } = user;
    return {
      success: true,
      user: {
        id,
        username,
        full_name,
        email,
        phone_number,
        role,
        enable,
        avatar,
        address,
        has_password: hash ? true : false
      },
      access_token,
      refresh_token
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.signup = async ({
  username,
  password,
  email,
  phone_number,
  full_name,
  address
}) => {
  try {
    const userFromServer = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }, { phone_number }]
      }
    });
    if (userFromServer) {
      if (userFromServer.username === username) {
        throw createError(409, 'Username already exists');
      }
      if (userFromServer.email === email) {
        throw createError(409, 'Email already exists');
      }
      if (userFromServer.phone_number === phone_number) {
        throw createError(409, 'Phone number already exists');
      }
    }
    const id = uuid();
    const hash = Bcrypt.hashPassword(password);
    const newUser = await User.create({
      id,
      username,
      hash,
      email,
      phone_number,
      full_name,
      address
    });
    const userAfterCreate = await User.findOne({
      where: { id }
    });
    return {
      success: true,
      user: {
        id,
        email: userAfterCreate.email,
        username: userAfterCreate.username,
        phone_number: userAfterCreate.phone_number,
        role: userAfterCreate.role,
        enable: userAfterCreate.enable,
        full_name: userAfterCreate.full_name,
        avatar: userAfterCreate.avatar,
        address: userAfterCreate.address,
        has_password: userAfterCreate.hash ? true : false
      }
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.refreshToken = async ({ refresh_token }) => {
  try {
    const user = await JWT.verifyRefreshToken(refresh_token);
    const { username } = user;

    const userFromServer = await User.findOne({
      where: {
        username
      }
    });

    if (!user) {
      throw createError(401, 'Refresh token is not valid');
    }
    if (userFromServer.refresh_token !== refresh_token) {
      throw createError(409, 'Refresh token is no longer usable');
    }

    const newAccessToken = JWT.generateAccessTokenByUser(user);

    const newRefreshToken = JWT.generateRefreshTokenByUser(user);

    await userFromServer.update({
      refresh_token: newRefreshToken
    });

    return {
      success: true,
      access_token: newAccessToken,
      refresh_token: newRefreshToken
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

exports.getUserById = async ({ id }) => {
  try {
    const userById = await User.findOne({
      where: { id },
      attributes: {
        exclude: ['refresh_token']
      }
    });
    if (!userById) throw createError(404, 'User does not exist');
    const {
      username,
      full_name,
      email,
      phone_number,
      role,
      enable,
      avatar,
      hash,
      address
    } = userById;
    const has_password = hash ? true : false;
    return {
      success: true,
      data: {
        id,
        username,
        full_name,
        email,
        phone_number,
        role,
        enable,
        avatar,
        address,
        has_password
      }
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.getUsers = async ({
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
}) => {
  try {
    const whereConditions = {};
    if (id) {
      whereConditions['id'] = id;
    }
    if (email) {
      whereConditions['email'] = email;
    }
    if (username) {
      whereConditions['username'] = username;
    }
    if (full_name) {
      whereConditions['full_name'] = full_name;
    }
    if (phone_number) {
      whereConditions['phone_number'] = phone_number;
    }
    if (role) {
      whereConditions['role'] = role;
    }
    if (enable !== undefined) {
      whereConditions['enable'] = enable;
    }

    const { limit, offset } = calculateLimitAndOffset(current_page, page_size);
    const { rows, count } = await User.findAndCountAll({
      where: whereConditions,
      attributes: {
        exclude: ['refresh_token', 'hash']
      },
      limit,
      offset,
      order: sort ? [sort.split('.')] : [['createdAt', 'DESC']]
    });

    const pagination = paginate(current_page, count, rows, page_size);
    
    return {
      success: true,
      data: rows,
      pagination
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.updateUserInfo = async ({
  id,
  username,
  full_name,
  email,
  phone_number,
  avatar,
  address
}) => {
  try {
    if (username !== undefined) {
      const userByUsername = await User.findOne({ where: { username } });
      if (userByUsername && userByUsername.id !== id)
        throw createError(409, 'Username already exists');
    }
    if (email !== undefined) {
      const userByEmail = await User.findOne({ where: { email } });
      if (userByEmail && userByEmail.id !== id)
        throw createError(409, 'Email already exists');
    }
    if (phone_number !== undefined) {
      const userByPhoneNumber = await User.findOne({ where: { phone_number } });
      if (userByPhoneNumber && userByPhoneNumber.id !== id)
        throw createError(409, 'Phone number already exists');
    }
    const user = await User.findOne({
      where: { id }
    });
    if (!user) throw createError(404, 'User does not exist');
    await user.update({
      username,
      full_name,
      email,
      phone_number,
      avatar,
      address
    });
    const userAfterUpdate = await User.findOne({
      where: { id }
    });
    return {
      success: true,
      user: {
        id,
        email: userAfterUpdate.email,
        username: userAfterUpdate.username,
        phone_number: userAfterUpdate.phone_number,
        role: userAfterUpdate.role,
        enable: userAfterUpdate.enable,
        full_name: userAfterUpdate.full_name,
        avatar: userAfterUpdate.avatar,
        address: userAfterUpdate.address,
        has_password: userAfterUpdate.hash ? true : false
      }
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.createPassword = async ({ user_id, password }) => {
  try {
    const user = await User.findByPk(user_id);
    if (!user) {
      throw createError(404, "User doesn't exist");
    }
    if (user.hash) {
      throw createError(409, "Your user already has password");
    }
    await user.update({
      hash: Bcrypt.hashPassword(password)
    });
    return { success: true }
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.resetPassword = async ({ user_id, current_password, new_password }) => {
  try {
    const user = await User.findOne({ where: { id: user_id } });
    if (!user) {
      throw createError(404, "User doesn't exist");
    }
    if (!user.hash) {
      throw createError(409, "Your user does not have password");
    }
    if (Bcrypt.verifyPassword(current_password, user.hash)) {
      await user.update({
        hash: Bcrypt.hashPassword(new_password)
      });
      return {
        success: true
      };
    } else {
      throw createError(401, 'Current password is incorrect');
    }
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.deleteUser = async ({ id }) => {
  try {
    const userToDelete = await User.findByPk(id);
    if (!userToDelete) throw createError(404, 'User does not exist');
    await userToDelete.destroy();
    return {
      success: true
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.deleteUsers = async ({ userIds }) => {
  try {
    const usersToDelete = await User.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: userIds
        }
      }
    });
    if (usersToDelete.length !== userIds.length)
      throw createError(404, 'One or more user does not exist');
    await sequelize.transaction(async (t) => {
      await Promise.all(
        usersToDelete.map((user) => {
          return user.destroy();
        })
      );
    });
    return {
      success: true
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.enableUser = async ({ id }) => {
  try {
    const userToEnable = await User.findByPk(id);
    if (!userToEnable) throw createError(404, 'User does not exist');
    await userToEnable.update({
      enable: true
    });
    return {
      success: true
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.disableUser = async ({ id }) => {
  try {
    const userToDisable = await User.findByPk(id);
    if (!userToDisable) throw createError(404, 'User does not exist');
    await userToDisable.update({
      enable: false
    });
    return {
      success: true
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.forgotPassword = async ({ email }) => {
  try {
    const userForgot = await User.findOne({
      where: { email }
    });
    if (!userForgot) throw createError(404, 'User with email does not exist');
    const new_password = Math.random().toString(36).slice(-8);
    await userForgot.update({
      hash: Bcrypt.hashPassword(new_password)
    });
    const { id, full_name } = userForgot;
    await forgotPasswordMailQueue.add(
      `Send email: forgot password - user ${userForgot.id}`,
      {
        user: { id, full_name, email },
        new_password
      }
    );
    return {
      success: true
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};
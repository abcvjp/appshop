const Joi = require('joi');
const Roles = require('../roles.helper');
module.exports = {
  signup: {
    body: Joi.object({
      username: Joi.string()
        .alphanum()
        .lowercase()
        .trim()
        .min(4)
        .max(20)
        .required(),
      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(6)
        .max(32)
        .required(),
      full_name: Joi.string().trim().min(1).max(50).required(),
      email: Joi.string().trim().email().required(),
      phone_number: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required()
    })
  },
  login: {
    body: Joi.object({
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().min(6).max(32).required()
    })
  },
  loginWithFirebase: {
    body: Joi.object({
      idToken: Joi.string().trim().required()
    })
  },
  getUserById: {
    params: Joi.object({
      userId: Joi.string().guid({ version: 'uuidv4' }).required()
    })
  },
  getUsers: {
    query: Joi.object({
      current_page: Joi.number().integer().min(1),
      page_size: Joi.number().integer().min(1),
      sort: Joi.string().min(1),
      email: Joi.string().trim().email().required(),
      username: Joi.string()
        .alphanum()
        .lowercase()
        .trim()
        .min(4)
        .max(20)
        .required(),
      full_name: Joi.string().trim().min(1).max(50).required(),
      phone_number: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
      role: Joi.string().trim().valid(Roles.User, Roles.User),
      enable: Joi.bool()
    })
  },
  updateUserInfo: {
    body: Joi.object({
      username: Joi.string()
        .alphanum()
        .lowercase()
        .trim()
        .min(4)
        .max(20)
        .required(),
      full_name: Joi.string().trim().min(1).max(50),
      email: Joi.string().trim().email(),
      phone_number: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/),
      avatar: Joi.string().max(255).allow(null),
      enable: Joi.bool()
    }),
    params: Joi.object({
      userId: Joi.string().guid({ version: 'uuidv4' }).required()
    })
  },
  resetPassword: {
    body: Joi.object({
      current_password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(6)
        .max(32)
        .required(),
      new_password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(6)
        .max(32)
        .required()
    }),
    params: Joi.object({
      userId: Joi.string().guid({ version: 'uuidv4' }).required()
    })
  },
  deleteUser: {
    params: Joi.object({
      userId: Joi.string().guid({ version: 'uuidv4' }).required()
    })
  },
  deleteUsers: {
    body: Joi.object({
      userIds: Joi.array()
        .min(1)
        .items(Joi.string().guid({ version: 'uuidv4' }))
        .required()
    })
  },
  enableUser: {
    params: Joi.object({
      userId: Joi.string().guid({ version: 'uuidv4' }).required()
    })
  },
  disableUser: {
    params: Joi.object({
      userId: Joi.string().guid({ version: 'uuidv4' }).required()
    })
  }
};

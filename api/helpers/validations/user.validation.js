const Joi = require('joi');

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
        .max(100)
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
      username: Joi.string().trim().min(4).max(20).required(),
      password: Joi.string().trim().min(6).max(100).required()
    })
  },
  getUserById: {
    params: Joi.object({
      userId: Joi.string().guid({ version: 'uuidv4' }).required()
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
      avatar: Joi.string().allow(null)
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
        .max(100)
        .required(),
      new_password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(6)
        .max(100)
        .required()
    }),
    params: Joi.object({
      userId: Joi.string().guid({ version: 'uuidv4' }).required()
    })
  }
};

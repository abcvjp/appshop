const { validate } = require("express-validation");

module.exports = {
  validate: (joiSchema) =>
    validate(joiSchema, {
      statusCode: 400,
      keyByField: true,
    }),
};

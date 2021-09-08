"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init(
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
        field: "username",
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.STRING,
        field: "role",
        defaultValue: "user",
        allowNull: false,
      },
      full_name: {
        type: DataTypes.STRING,
        field: "full_name",
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        field: "email",
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      hash: {
        type: DataTypes.STRING,
        field: "hash",
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        field: "avatar",
        allowNull: true,
      },
      refresh_token: {
        type: DataTypes.TEXT,
        field: "refresh_token",
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

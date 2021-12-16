'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order, {
        foreignKey: { name: 'user_id', allowNull: true },
        onDelete: 'RESTRICT'
      });
      User.hasMany(models.WishItem, {
        foreignKey: { name: 'user_id', allowNull: false },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  User.init(
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      username: {
        type: DataTypes.STRING,
        field: 'username',
        allowNull: true,
        unique: true
      },
      role: {
        type: DataTypes.STRING,
        field: 'role',
        defaultValue: 'user',
        allowNull: false
      },
      enable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      full_name: {
        type: DataTypes.STRING,
        field: 'full_name',
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        field: 'email',
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      phone_number: {
        type: DataTypes.STRING,
        field: 'phone_number',
        allowNull: true,
        unique: true
      },
      hash: {
        type: DataTypes.STRING,
        field: 'hash',
        allowNull: true
      },
      avatar: {
        type: DataTypes.STRING,
        field: 'avatar',
        allowNull: true
      },
      refresh_token: {
        type: DataTypes.TEXT,
        field: 'refresh_token',
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'User'
    }
  );
  return User;
};

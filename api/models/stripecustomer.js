'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StripeCustomer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StripeCustomer.belongsTo(models.User, {
        foreignKey: { name: 'user_id', allowNull: false, unique: true },
		as: 'user'
      });
    }
  }

  StripeCustomer.init(
    {
	  customer_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      sequelize,
      modelName: 'StripeCustomer',
    }
  );
  return StripeCustomer;
};
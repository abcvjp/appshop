'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.User, {
        foreignKey: { name: 'user_id', allowNull: false, unique: true }
      });
    }
  }

  Cart.init(
    {
		items: {
			type: DataTypes.JSON,
			allowNull: true
		},
		sub_total: {
			type: DataTypes.DOUBLE,
			allowNull: false,
			defaultValue: 0,
			validate: {
				min: 0
			}
		},
    },
    {
      sequelize,
      modelName: 'Cart',

    }
  );
  return Cart;
};
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WishItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      WishItem.belongsTo(models.User, {
        foreignKey: { name: 'user_id', allowNull: false }
      });
      WishItem.belongsTo(models.Product, {
        foreignKey: { name: 'product_id', allowNull: false }
      });
    }
  }

  WishItem.init(
    {
      
    },
    {
      sequelize,
      modelName: 'WishItem',

    }
  );
  return WishItem;
};

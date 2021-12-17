'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.User, {
        foreignKey: { name: 'user_id', allowNull: false },
        as: 'user'
      });
      Review.belongsTo(models.Product, {
        foreignKey: { name: 'product_id', allowNull: false },
        as: 'product'
      });
    }
  }

  Review.init(
    {
      star: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
		  max: 5
        }
      },
	  comment: {
        type: DataTypes.TEXT('medium'),
        allowNull: true
      },
    },
    {
      sequelize,
      modelName: 'Review',
    }
  );
  return Review;
};

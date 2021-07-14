'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: { name: 'category_id', allowNull: false } })
      Product.hasMany(models.OrderItem, { foreignKey: { name: 'product_id', allowNull: false } })
    }
  };
  Product.init({
    enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    discount: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 1
      }
    },
    short_description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isLowercase: true
      }
    },
    meta_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    meta_description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    meta_keywords: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
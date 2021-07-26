'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Product, { foreignKey: { name: 'category_id', allowNull: false }, as: 'products' })
      Category.hasMany(Category, {
        foreignKey: {
          name: 'parent_id',
          allowNull: true,
        },
        as: 'childs',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    }
  };
  Category.init({
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    modelName: 'Category',
  });
  return Category;
};
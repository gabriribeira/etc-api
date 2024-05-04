'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      Item.belongsTo(models.List, {
        foreignKey: 'list_id'
      });
      Item.belongsTo(models.Category, {
        foreignKey: 'category_id'
      });
      Item.belongsToMany(models.User, {
        through: 'Item_User',
        foreignKey: 'item_id'
      });
    }
  }
  Item.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name is required'
        }
      }
    },
    value: DataTypes.DECIMAL,
    amount: DataTypes.DECIMAL,
    unit: DataTypes.STRING,
    details: DataTypes.STRING,
    brand: DataTypes.STRING,
    store: DataTypes.STRING,
    img_url: DataTypes.STRING,
    is_suggestion: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'is_suggestion field is required'
        }
      }
    },
    is_expense: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'is_expense field is required'
        }
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "created_at",
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "updated_at",
      defaultValue: new Date(),
    },
  }, {
    sequelize,
    modelName: 'Item',
    tableName: 'items',
  });
  return Item;
};

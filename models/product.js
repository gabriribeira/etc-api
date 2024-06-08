"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // Product.belongsTo(models.List, {
      //   foreignKey: 'list_id'
      // });
      Product.belongsTo(models.Category, {
        foreignKey: "category_id",
      });
      // Product.belongsToMany(models.User, {
      //   through: 'Item_User',
      //   foreignKey: 'item_id'
      // });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required",
          },
        },
      },
      value: DataTypes.DECIMAL,
      amount: DataTypes.DECIMAL,
      unit: DataTypes.STRING,
      details: DataTypes.STRING,
      brand: DataTypes.STRING,
      store: DataTypes.STRING,
      img_url: DataTypes.STRING,
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
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
    }
  );
  return Product;
};

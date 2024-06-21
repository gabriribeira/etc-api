"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_List extends Model {
    static associate(models) {
      User_List.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      User_List.belongsTo(models.List, {
        foreignKey: "list_id",
      });
    }
  }
  User_List.init(
    {
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
      modelName: "User_List",
      tableName: "users_lists",
    }
  );
  return User_List;
};

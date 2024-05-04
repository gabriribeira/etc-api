"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_Household extends Model {
    static associate(models) {
      User_Household.hasMany(models.Role, {
        foreignKey: "role_id",
      });
    }
  }
  User_Household.init(
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
      modelName: "User_Household",
      tableName: "users_households",
    }
  );
  return User_Household;
};

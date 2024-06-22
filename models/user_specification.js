"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_Specification extends Model {
    static associate(models) {
      User_Specification.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
      User_Specification.belongsTo(models.Specification, {
        foreignKey: "specification_id",
        onDelete: "CASCADE",
      });
    }
  }
  User_Specification.init(
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
      modelName: "User_Specification",
      tableName: "users_specifications",
    }
  );
  return User_Specification;
};

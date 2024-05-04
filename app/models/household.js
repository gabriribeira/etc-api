"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Household extends Model {
    static associate(models) {
      Household.belongsToMany(models.Tag, {
        through: "Household_Tag",
        foreignKey: "household_id",
      });
      Household.belongsToMany(models.User, {
        through: "User_Household",
        foreignKey: "household_id",
      });
    }
  }
  Household.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required",
          },
          len: {
            args: [2, 64],
            msg: "Name must be between 2 and 64 characters",
          },
        },
      },
      img_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: {
            args: [0, 512],
            msg: "Description cannot exceed 512 characters",
          },
        },
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
    },
    {
      sequelize,
      modelName: "Household",
      tableName: "households",
    }
  );
  return Household;
};

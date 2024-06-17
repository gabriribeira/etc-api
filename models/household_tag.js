"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Household_Tag extends Model {
    static associate(models) {
    }
  }
  Household_Tag.init(
    {
      household_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Household",
          key: "id",
        },
      },
      tag_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Tag",
          key: "id",
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
      modelName: "Household_Tag",
      tableName: "households_tags",
    }
  );
  return Household_Tag;
};

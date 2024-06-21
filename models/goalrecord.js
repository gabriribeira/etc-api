"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Goal_Record extends Model {
    static associate(models) {
      Goal_Record.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Goal_Record.belongsTo(models.Household_Goal, { foreignKey: 'household_goal_id' });
    }
  }
  Goal_Record.init(
    {
      household_goal_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Household_Goal',
          key: 'id'
        }
      },
      increment_value: DataTypes.INTEGER,
      value_after_increment: DataTypes.INTEGER,
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
      modelName: "Goal_Record",
      tableName: "goals_records",
    }
  );
  return Goal_Record;
};
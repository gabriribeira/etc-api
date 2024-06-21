"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Household_Goal extends Model {
    static associate(models) {
      Household_Goal.belongsTo(models.Household, {
        foreignKey: "household_id",
      });
      Household_Goal.hasMany(models.Goal_Record, { foreignKey: 'household_goal_id' });
      Household_Goal.belongsTo(models.Goal, { foreignKey: 'goal_id' });
    }
  }
  Household_Goal.init(
    {
      goal_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Goal',
          key: 'id'
        }
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Start date is required",
          },
        },
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "End date is required",
          },
        },
      },
      is_completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      is_finished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      household_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Household",
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
      modelName: "Household_Goal",
      tableName: "households_goals",
    }
  );
  return Household_Goal;
};
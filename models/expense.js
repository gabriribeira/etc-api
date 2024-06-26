'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    static associate(models) {
      Expense.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'payer',
      });
      Expense.belongsTo(models.Household, {
        foreignKey: 'household_id'
      });
      Expense.belongsToMany(models.User, {
        through: 'Expense_User',
        as: 'users',
        foreignKey: 'expense_id',
        onDelete: 'CASCADE',
      });
    }
  }
  Expense.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title is required'
        }
      }
    },
    details: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Value is required'
        },
        isNumeric: {
          msg: 'Value must be a number'
        },
        min: {
          args: [0],
          msg: 'Value must be greater than or equal to 0'
        }
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
    modelName: 'Expense',
    tableName: 'expenses',
  });
  return Expense;
};
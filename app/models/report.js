'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
  }
  Report.init({
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Type is required'
        }
      }
    },
    details: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Details are required'
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
    modelName: 'Report',
    tableName: 'reports',
  });
  return Report;
};

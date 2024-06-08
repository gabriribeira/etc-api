'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specification extends Model {
    static associate(models) {
      Specification.belongsToMany(models.User, {
        through: 'User_Specification',
        foreignKey: 'specification_id'
      });
    }
  }
  Specification.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name is required'
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
    modelName: 'Specification',
    tableName: 'specifications',
  });
  return Specification;
};

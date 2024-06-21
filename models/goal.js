'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Goal extends Model {
    static associate(models) {
      Goal.belongsTo(models.Tag, {
        foreignKey: 'tag_id'
      });
      Goal.belongsToMany(models.Household, {
        through: "Household_Goal",
        foreignKey: 'goal_id',
      });
      Goal.hasMany(models.Household_Goal, { foreignKey: 'goal_id' });
    }
  }
  Goal.init({
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
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Details are required'
        }
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Slug is required'
        }
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Amount is required'
        }
      }
    },
    periodicity: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Periodicity is required'
        }
      },
      defaultValue: 'monthly',
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Image URL is required'
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
    modelName: 'Goal',
    tableName: 'goals',
  });
  return Goal;
};

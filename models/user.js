"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.List, { 
        foreignKey: "user_id", 
        as: "CreatedLists",
        onDelete: "CASCADE",
      });
      User.hasMany(models.List, {
        foreignKey: "user_id_closed",
        as: "ClosedLists",
        onDelete: "CASCADE",
      });
      User.hasMany(models.Goal_Record, {
        foreignKey: "user_id",
      });
      User.hasMany(models.Expense, {
        foreignKey: "user_id",
      });
      User.belongsToMany(models.Expense, {
        through: 'Expense_User',
        as: 'expenses',
        foreignKey: 'user_id',
      });
      
      User.belongsToMany(models.Item, {
        through: "Item_User",
        foreignKey: "user_id",
      });
      User.belongsToMany(models.Household, {
        through: models.User_Household,
        foreignKey: "user_id",
      });
      User.hasMany(models.User_Household, {
        foreignKey: "user_id",
      });
      User.belongsToMany(models.Specification, {
        through: 'User_Specification',
        foreignKey: 'user_id',
        otherKey: 'specification_id'
      });
      User.belongsToMany(models.List, {
        through: "User_List",
        foreignKey: "user_id",
      });
    }
    static findByEmail(email) {
      return this.findOne({ where: { email } });
    }
    static async getUsersByHouseholdId(householdId) {
      try {
        const users = await User.findAll({
          include: {
            model: sequelize.models.Household,
            where: { id: householdId },
          },
        });
        return users;
      } catch (error) {
        console.error("Error fetching users by household ID:", error.message);
        throw error;
      }
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: {
            args: [2, 64],
            msg: "Name must be between 2 and 64 characters",
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isAlphanumeric: {
            msg: "Username must contain only letters and numbers",
          },
          len: {
            args: [3, 28],
            msg: "Username must be between 3 and 28 characters",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isEmail: {
            msg: "Invalid email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: {
            args: [8, 512],
            msg: "Password must be between 8 and 512 characters",
          },
        },
      },
      img_url: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {},
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
      googleId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      facebookId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
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
      modelName: "User",
      tableName: "users",
    }
  );

  return User;
};

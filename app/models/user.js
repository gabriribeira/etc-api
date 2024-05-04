"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.List, {
        foreignKey: "user_id",
      });
      User.hasMany(models.List, {
        foreignKey: "user_id_closed",
      });
      User.hasMany(models.Goal_Record, {
        foreignKey: "user_id",
      });
      User.hasMany(models.Expense, {
        foreignKey: "user_id",
      });
      User.belongsToMany(models.Expense, {
        through: "Expense_User",
        foreignKey: "user_id",
      });
      User.belongsToMany(models.Item, {
        through: "Item_User",
        foreignKey: "user_id",
      });
      User.belongsToMany(models.Household, {
        through: "User_Household",
        foreignKey: "user_id",
      });
      User.belongsToMany(models.Specification, {
        through: "User_Specification",
        foreignKey: "user_id",
      });
    }
    static findByEmail(email) {
      return this.findOne({ where: { email } });
    }
  }
  User.init(
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
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Username is required",
          },
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
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Invalid email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password is required",
          },
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

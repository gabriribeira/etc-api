"use strict";
const { Model } = require("sequelize");
const Notification = require("../controllers/notification");

module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    static associate(models) {
      List.belongsTo(models.User, { foreignKey: "user_id", as: "User" });
      List.belongsTo(models.Household, { foreignKey: "household_id" });
      List.belongsTo(models.User, {
        foreignKey: "user_id_closed",
        as: "ClosedByUser",
      });
      List.hasMany(models.Item, { foreignKey: "list_id", as: "Items" });
    }
  }
  List.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      estimated_value: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      is_closed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_finished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
      modelName: "List",
      tableName: "lists",
      hooks: {
        afterCreate: async (list, options) => {
          try {
            const householdId = list.household_id;

            const notification = {
              message: `A new list was created in household ${householdId}`,
              listId: list.id,
            };

            emitNotificationToHousehold(householdId, notification);
          } catch (error) {
            console.error("Error emitting notification:", error.message);
          }
        },
        afterDestroy: async (list, options) => {
          try {
            const userId = options.req.session.passport.user;
            const user = await sequelize.models.User.findByPk(userId);
            const household = await sequelize.models.Household.findByPk(
              list.household_id
            );
            const users = await household.getUsers();

            const notificationMessage = `${user.name} deleted the list ${list.name}`;

            users.forEach(async (member) => {
              const notification = new Notification({
                user_id: member.id,
                message: notificationMessage,
                timestamp: new Date(),
              });
              await notification.save();
            });
          } catch (error) {
            console.error("Error fetching household users:", error.message);
          }
        },
        afterUpdate: async (list, options) => {
          try {
            const household = await sequelize.models.Household.findByPk(
              list.household_id
            );
            const users = await household.getUsers();

            const notificationMessage = `List ${list.name} was updated`;

            users.forEach(async (member) => {
              const notification = new Notification({
                user_id: member.id,
                message: notificationMessage,
                timestamp: new Date(),
              });
              await notification.save();
            });

            emitNotification(list.household_id, {
              message: notificationMessage,
            });
          } catch (error) {
            console.error("Error fetching household users:", error.message);
          }
        },
      },
    }
  );
  return List;
};

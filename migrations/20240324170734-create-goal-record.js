"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("goals_records", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      household_goal_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "households_goals", key: "id" },
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      increment_value: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      value_after_increment: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: new Date(),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: new Date(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("goals_records");
  },
};

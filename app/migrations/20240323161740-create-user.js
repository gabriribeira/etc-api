"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "users",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
          validate: {
            len: [2, 64],
          },
        },
        username: {
          allowNull: false,
          type: Sequelize.STRING,
          unique: true,
          validate: {
            len: [3, 28],
          },
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING,
          validate: {
            len: [8, 512],
          },
        },
        img_url: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        description: {
          allowNull: true,
          type: Sequelize.STRING,
          validate: {
            len: [0, 512],
          },
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
      },
      {
        tableName: "users",
        underscored: true,
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};

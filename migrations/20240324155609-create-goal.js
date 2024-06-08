'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('goals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      details: {
        allowNull: false,
        type: Sequelize.STRING
      },
      periodicity: {
        allowNull: false,
        type: Sequelize.STRING
      },
      end_date: {
        allowNull: false,
        type: Sequelize.STRING
      },
      img_url: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tag_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'tags', key: 'id' }
      },
      household_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'households', key: 'id' }
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
    await queryInterface.dropTable('goals');
  }
};

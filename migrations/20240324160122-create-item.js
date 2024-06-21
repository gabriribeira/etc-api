'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      list_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'lists', key: 'id' },
        onDelete: 'CASCADE'
      },
      category_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: 'categories', key: 'id' }
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      value: {
        allowNull: true,
        type: Sequelize.STRING
      },
      amount: {
        allowNull: true,
        type: Sequelize.STRING
      },
      unit: {
        allowNull: true,
        type: Sequelize.STRING
      },
      details: {
        allowNull: true,
        type: Sequelize.STRING
      },
      brand: {
        allowNull: true,
        type: Sequelize.STRING
      },
      store: {
        allowNull: true,
        type: Sequelize.STRING
      },
      img_url: {
        allowNull: true,
        type: Sequelize.STRING
      },
      is_suggestion: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      is_expense: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('items');
  }
};

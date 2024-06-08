'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'categories', key: 'id' }
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      value: {
        allowNull: true,
        type: Sequelize.DECIMAL
      },
      amount: {
        allowNull: true,
        type: Sequelize.DECIMAL
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
    await queryInterface.dropTable('products');
  }
};

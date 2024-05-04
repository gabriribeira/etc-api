'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     // Insert base data into your table
     await queryInterface.bulkInsert('roles', [
      { title: "Regular User", details: "Regular User" },
      { title: "Admin User", details: "Admin User" },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // Remove the inserted data
    await queryInterface.bulkDelete('roles', null, {});
  }
};
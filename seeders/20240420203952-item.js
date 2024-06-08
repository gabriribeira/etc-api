"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "items",
      [
        {
          list_id: 1,
          category_id: 1,
          name: "Toothbrush",
          is_suggestion: false,
          is_expense: false,
        },
        {
          list_id: 2,
          category_id: 3,
          name: "Bread",
          is_suggestion: false,
          is_expense: false,
        },
        {
          list_id: 1,
          category_id: 2,
          name: "Detergent",
          is_suggestion: false,
          is_expense: false,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

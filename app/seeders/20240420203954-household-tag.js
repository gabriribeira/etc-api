"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "households_tags",
      [
        {
          household_id: 1,
          tag_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          household_id: 1,
          tag_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          household_id: 1,
          tag_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          household_id: 2,
          tag_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          household_id: 2,
          tag_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
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

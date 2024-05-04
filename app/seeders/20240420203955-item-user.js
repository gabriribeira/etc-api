"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "items_users",
      [
        {
          item_id: 1,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          item_id: 2,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          item_id: 1,
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          item_id: 1,
          user_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          item_id: 2,
          user_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          item_id: 3,
          user_id: 4,
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

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users_specifications",
      [
        {
          user_id: 1,
          specification_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          specification_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 3,
          specification_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 4,
          specification_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 5,
          specification_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 6,
          specification_id: 6,
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

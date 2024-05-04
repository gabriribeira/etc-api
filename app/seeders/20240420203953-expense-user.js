"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "expenses_users",
      [
        {
          expense_id: 1,
          user_id: 1,
          is_paid: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          expense_id: 2,
          user_id: 2,
          is_paid: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          expense_id: 3,
          user_id: 3,
          is_paid: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          expense_id: 4,
          user_id: 4,
          is_paid: true,
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

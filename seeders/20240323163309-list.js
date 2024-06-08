"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "lists",
      [
        {
          name: "Miguel's Birthday",
          description: "Miguel's Birthday List",
          user_id: 1,
          household_id: 1,
          user_id_closed: null,
          is_closed: false,
          is_finished: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "MCTW Lunch 02JUN",
          description: "MCTW Lunch 02JUN Description",
          user_id: 3,
          household_id: 1,
          user_id_closed: null,
          is_closed: false,
          is_finished: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Closed List",
          description: "Closed List description",
          user_id: 4,
          household_id: 1,
          user_id_closed: 2,
          is_closed: true,
          is_finished: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Finished List",
          description: "Finished List description",
          user_id: 4,
          household_id: 1,
          user_id_closed: 2,
          is_closed: true,
          is_finished: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "João's Birthday",
          description: "João's Birthday List",
          user_id: 3,
          household_id: 2,
          user_id_closed: null,
          is_closed: false,
          is_finished: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "MCTW Dinner 02JUN",
          description: "MCTW Lunch 02JUN Description",
          user_id: 4,
          household_id: 2,
          user_id_closed: null,
          is_closed: false,
          is_finished: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Closed List on 2nd Household",
          description: "Closed List description",
          user_id: 4,
          household_id: 2,
          user_id_closed: 2,
          is_closed: true,
          is_finished: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Finished List on 2nd",
          description: "Finished List description",
          user_id: 3,
          household_id: 2,
          user_id_closed: 4,
          is_closed: true,
          is_finished: true,
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

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "expenses",
      [
        {
          user_id: 1,
          household_id: 1,
          title: "McDonald's Lunch",
          details: "Big Mac Meal, 2 Cheeseburgers, 1 McFlurry",
          value: 15.5,
          date: new Date(),
          is_paid: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          household_id: 1,
          title: "Pizza Hut Dinner",
          details: "2 Large Pizzas, 1 Garlic Bread, 1 1.5L Coke",
          value: 25.0,
          date: new Date(),
          is_paid: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 3,
          household_id: 1,
          title: "Burger King Lunch",
          details: "Whopper Meal, 6 Chicken Nuggets, 1 Sundae",
          value: 12.5,
          date: new Date(),
          is_paid: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 4,
          household_id: 1,
          title: "KFC Dinner",
          details: "10 Hot Wings, 1 Chicken Bucket, 1 1.5L Pepsi",
          value: 20.0,
          date: new Date(),
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

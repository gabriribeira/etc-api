"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "goals",
      [
        {
          title: "Vegetarian Month",
          details:
            "No meat for a month. Only fish and vegetables. No exceptions.",
          periodicity: "Monthly",
          end_date: new Date("2022-05-01"),
          img_url:
            "https://www.thespruceeats.com/thmb/1Z6J9Q1Z9Z6Z9Z6Z9Z6Z9Z6Z9Z6-=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/vegetarian-recipes-3376828-hero-01-5c4b7b3bc9e77c0001f3f3b4.jpg",
          tag_id: 1,
          household_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "No Alcohol Week",
          details: "No alcohol for a week. No exceptions.",
          periodicity: "Weekly",
          end_date: new Date("2022-05-01"),
          img_url:
            "https://www.thespruceeats.com/thmb/1Z6J9Q1Z9Z6Z9Z6Z9Z6Z9Z6Z9Z6-=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/vegetarian-recipes-3376828-hero-01-5c4b7b3bc9e77c0001f3f3b4.jpg",
          tag_id: 2,
          household_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "No Sugar Day",
          details: "No sugar for a day. No exceptions.",
          periodicity: "Daily",
          end_date: new Date("2022-05-01"),
          img_url:
            "https://www.thespruceeats.com/thmb/1Z6J9Q1Z9Z6Z9Z6Z9Z6Z9Z6Z9Z6-=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/vegetarian-recipes-3376828-hero-01-5c4b7b3bc9e77c0001f3f3b4.jpg",
          tag_id: 3,
          household_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "No Coffee Month",
          details: "No coffee for a month. No exceptions.",
          periodicity: "Monthly",
          end_date: new Date("2022-05-01"),
          img_url:
            "https://www.thespruceeats.com/thmb/1Z6J9Q1Z9Z6Z9Z6Z9Z6Z9Z6Z9Z6-=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/vegetarian-recipes-3376828-hero-01-5c4b7b3bc9e77c0001f3f.jog",
          tag_id: 4,
          household_id: 1,
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

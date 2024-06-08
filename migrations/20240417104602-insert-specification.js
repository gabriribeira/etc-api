'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     // Insert base data into your table
     await queryInterface.bulkInsert('specifications', [
      { name: "Vegetarian", details: "Vegetarian" },
      { name: "Vegan", details: "Vegan" },
      { name: "Pescatarian", details: "Avoids meat but eats fish and seafood" },
      { name: "Lacto-Vegetarian", details: "Consumes dairy but not eggs or meat" },
      { name: "Lactose Intolerant", details: "Lactose Intolerant" },
      { name: "Gluten Intolerant", details: "Gluten Intolerant" },
      { name: "Nut Allergy", details: "Nut Allergy" },
      { name: "Peanut Allergy", details: "Peanut Allergy" },
      { name: "Sulfite Allergy", details: "Sulfite Allergy" },
      { name: "Soy Allergy", details: "Soy Allergy" },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // Remove the inserted data
    await queryInterface.bulkDelete('specifications', null, {});
  }
};
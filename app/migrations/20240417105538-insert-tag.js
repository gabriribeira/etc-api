'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     // Insert base data into your table
     await queryInterface.bulkInsert('tags', [
      { title: "Reduce"},
      { title: "Reuse"},
      { title: "Recycle"},
      { title: "Energy Efficient"},
      { title: "Composting"},
      { title: "Vegetarian"},
      { title: "Vegan"},
      { title: "Green Transportation"},
      { title: "Local Shopping"},
      { title: "Second-hand Shopping"},
      { title: "Tree Planting"},
      { title: "Energy Saving"},
      { title: "Eco-Friendly"},
      { title: "Digital Detox"},
      { title: "Zero Waste"},
      { title: "Water Saving"},
      { title: "Sharing"},
      { title: "Volunteering"},
      { title: "Ethical Fashion"},
      { title: "Plastic Free"},
      { title: "Pet Care"},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // Remove the inserted data
    await queryInterface.bulkDelete('tags', null, {});
  }
};
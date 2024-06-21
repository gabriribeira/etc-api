'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert base data into your table
    await queryInterface.bulkInsert('goals', [
      {
        title: "Plan your weekly meals for your mouth",
        slug: "Planned Meals Month",
        details: "By planning your meals, you'll reduce food waste, buy only what's strictly necessary and help yourself save money",
        periodicity: "Monthly",
        amount: 4,
        tag_id: 1, // Reduce
        img_url: "https://res.cloudinary.com/dv7hswrot/image/upload/v1649780134/ecohero/meal-planning.jpg"
      },
      {
        title: "Crafting with Creativity",
        slug: "Reuse Your Items",
        details: "By reusing objects you already have, you're reducing the amount of items that are produced and used only once and you're improving the impact this waste has on the environment",
        periodicity: "Monthly",
        amount: 5,
        tag_id: 2, // Reuse
        img_url: "https://res.cloudinary.com/dv7hswrot/image/upload/v1649780134/ecohero/reuse-items.jpg"
      },
      {
        title: "Salvage Style",
        slug: "Swap Your Closet",
        details: "Swapping clothes that you no longer wear, that you don't like or that don't fit you with clothes from your friends allows you to have new pieces in your closet and to keep improving sustainability",
        periodicity: "Monthly",
        amount: 3,
        tag_id: 19, // Ethical Fashion
        img_url: "https://res.cloudinary.com/dv7hswrot/image/upload/v1649780134/ecohero/swap-clothes.jpg"
      },
      {
        title: "Green Generation",
        slug: "Greener Journey",
        details: "Choosing more environmentally friendly transporting reduces carbon dioxide emissions and your footprint",
        periodicity: "Monthly",
        amount: 6,
        tag_id: 8, // Green Transportation
        img_url: "https://res.cloudinary.com/dv7hswrot/image/upload/v1649780134/ecohero/green-transport.jpg"
      },
      {
        title: "Renewed Resources",
        slug: "Don’t Shop Month",
        details: "Create your own pet toys and accessories from recycled or repurposed materials, such as old clothing, cardboard boxes, and fabric scraps",
        periodicity: "Monthly",
        amount: 2,
        tag_id: 21, // Pet Care
        img_url: "https://res.cloudinary.com/dv7hswrot/image/upload/v1649780134/ecohero/pet-toys.jpg"
      },
      {
        title: "Support Local Producers",
        slug: "Local-Only Month",
        details: "Support local businesses reduce carbon footprint and foster a connection to the community",
        periodicity: "Monthly",
        amount: 4,
        tag_id: 9, // Local Shopping
        img_url: "https://res.cloudinary.com/dv7hswrot/image/upload/v1649780134/ecohero/local-produce.jpg"
      },
      {
        title: "Thrift Treasure Trove",
        slug: "Second-Hand Month",
        details: "Buying from second-hand stores reduces waste and gives a second life to items that will be reused",
        periodicity: "Monthly",
        amount: 5,
        tag_id: 10, // Second-hand Shopping
        img_url: "https://res.cloudinary.com/dv7hswrot/image/upload/v1649780134/ecohero/second-hand.jpg"
      },
      {
        title: "Upcycle Wonders",
        slug: "Zero-Waste Month",
        details: "Implement a recycling system and take note of all waste your Household generates",
        periodicity: "Monthly",
        amount: 10,
        tag_id: 3, // Recycle
        img_url: "https://res.cloudinary.com/dv7hswrot/image/upload/v1649780134/ecohero/recycling.jpg"
      },
      {
        title: "The Tree Plan",
        slug: "Promote Tree Planting",
        details: "Initiate tree planting programs at local schools. Educate students about the benefits of trees and involve them in planting and caring for the trees",
        periodicity: "Monthly",
        amount: 2,
        tag_id: 11, // Tree Planting
        img_url: "https://res.cloudinary.com/dv7hswrot/image/upload/v1649780134/ecohero/tree-planting.jpg"
      },
      {
        title: "Makes Efficient Changes",
        slug: "Increase Energy Efficiency",
        details: "By making energy-efficient changes to your home, that will help you improve your energy efficiency, reduce your energy bills, and contribute to a more sustainable future",
        periodicity: "Monthly",
        amount: 3,
        tag_id: 4, // Energy Efficient
        img_url: "https://res.cloudinary.com/dv7hswrot/image/upload/v1649780134/ecohero/energy-efficient.jpg"
      },
      {
        title: "Eat a Plant-Based Diet",
        slug: "Eco-friendly Choices",
        details: "Reduce your carbon footprint by incorporating more plant-based meals into your diet. Aim for meatless days and choose locally-sourced, organic produce",
        periodicity: "Monthly",
        amount: 5,
        tag_id: 13, // Eco-Friendly
        img_url: "https://res.cloudinary.com/dv7hswrot/image/upload/v1649780134/ecohero/plant-based.jpg"
      },
      {
        title: "Screen-Free Sunday",
        slug: "Digital Detox Era",
        details: "Reducing the use of digital devices can lead to lower energy consumption and the preservation of natural resources, and consequently allows you to focus on hobbies and connect with people",
        periodicity: "Monthly",
        amount: 5,
        tag_id: 14, // Digital Detox
        img_url: "https://res.cloudinary.com/dv7hswrot/image/upload/v1649780134/ecohero/digital-detox.jpg"
      },
      {
        title: "Composting Lefthovers",
        slug: "Composting Experience",
        details: "Collect lefthover food and peelings and put them in a container with soil to make composting",
        periodicity: "Monthly",
        amount: 30,
        tag_id: 5, // Composting
        img_url: "https://res.cloudinary.com/dv7hswrot/image/upload/v1649780134/ecohero/composting.jpg"
      },
      {
        title: "Share Rides",
        slug: "Time To Share",
        details: "Carpool with friends, family, or coworkers to reduce the number of vehicles on the road, lower emissions, and save on fuel costs.",
        periodicity: "Monthly",
        amount: 10,
        tag_id: 17, // Sharing
        img_url: "https://res.cloudinary.com/dv7hswrot/image/upload/v1649780134/ecohero/carpool.jpg"
      },
      {
        title: "Help In Holiday Season",
        slug: "December Thanks-Giving",
        details: "Collect and donate gifts or necessities for children or families in need during the holiday season",
        periodicity: "Monthly",
        amount: 2,
        tag_id: 18, // Volunteering
        img_url: "https://res.cloudinary.com/dv7hswrot/image/upload/v1649780134/ecohero/volunteering.jpg"
      },
      {
        title: "Vegetarian Voyage",
        slug: "Vegetarian Month",
        details: "Try adopting a vegetarian diet for a month. Plan your meals around vegetables, fruits, grains, and legumes to discover new flavors and contribute to reducing your carbon footprint",
        periodicity: "Monthly",
        amount: 4,
        tag_id: 6, // Vegetarian
        img_url: "https://res.cloudinary.com/dv7hswrot/image/upload/v1649780134/ecohero/vegetarian.jpg"
      },
      {
        title: "Vegan Victory",
        slug: "Vegan Challenge",
        details: "Challenge yourself to go vegan for a month. This involves eliminating all animal products from your diet, which can significantly reduce your environmental impact and improve your health.",
        periodicity: "Monthly",
        amount: 4,
        tag_id: 7, // Vegan
        img_url: "https://res.cloudinary.com/dv7hswrot/image/upload/v1649780134/ecohero/vegan.jpg"
      },
      {
        title: "Energy Saving",
        slug: "Energy Saving Week",
        details: "Make conscious efforts to reduce energy consumption by turning off lights and appliances when not in use, using energy-efficient bulbs, and unplugging devices. Track your energy savings each week.",
        periodicity: "Weekly",
        amount: 4,
        tag_id: 12, // Energy Saving
        img_url: "https://res.cloudinary.com/dv7hswrot/image/upload/v1649780134/ecohero/energy-saving.jpg"
      },
      {
        title: "Zero Waste",
        slug: "Zero Waste Week",
        details: "Aim to produce no waste for a week by composting, recycling, and using reusable items. Track your waste and make adjustments to minimize it further.",
        periodicity: "Weekly",
        amount: 4,
        tag_id: 15, // Zero Waste
        img_url: "https://res.cloudinary.com/dv7hswrot/image/upload/v1649780134/ecohero/zero-waste.jpg"
      },
      {
        title: "Water Saving",
        slug: "Water Saving Month",
        details: "Reduce water usage by taking shorter showers, fixing leaks, using water-saving fixtures, and collecting rainwater for gardening. Monitor your water bill to see the impact.",
        periodicity: "Monthly",
        amount: 4,
        tag_id: 16, // Water Saving
        img_url: "https://res.cloudinary.com/dv7hswrot/image/upload/v1649780134/ecohero/water-saving.jpg"
      },
      {
        title: "Plastic Free",
        slug: "Plastic-Free Month",
        details: "Avoid single-use plastics by using reusable bags, bottles, and containers. Participate in a plastic-free challenge and see how much you can reduce your plastic consumption.",
        periodicity: "Monthly",
        amount: 4,
        tag_id: 20, // Plastic Free
        img_url: "https://res.cloudinary.com/dv7hswrot/image/upload/v1649780134/ecohero/plastic-free.jpg"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Remove the inserted data
    await queryInterface.bulkDelete('goals', null, {});
  }
};
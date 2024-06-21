"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert base data into your table
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Produce",
          details: "Fresh fruits, vegetables, herbs, and salads",
        },
        { name: "Dairy", details: "Milk, cheese, yogurt, butter, and eggs" },
        {
          name: "Meat and Seafood",
          details: "Beef, pork, poultry, seafood, and deli meats",
        },
        {
          name: "Bakery",
          details: "Bread, rolls, pastries, cakes, and desserts",
        },
        {
          name: "Frozen Foods",
          details: "Frozen fruits, vegetables, meals, pizzas, and ice cream",
        },
        {
          name: "Canned and Packaged Goods",
          details:
            "Canned fruits, vegetables, soups, sauces, pasta, rice, and canned meats",
        },
        {
          name: "Snacks and Chips",
          details: "Chips, crackers, pretzels, popcorn, nuts, and snack bars",
        },
        {
          name: "Beverages",
          details:
            "Sodas, juices, bottled water, energy drinks, tea, and coffee",
        },
        {
          name: "Condiments and Sauces",
          details:
            "Ketchup, mustard, mayonnaise, salad dressings, marinades, and sauces",
        },
        {
          name: "Grains and Pasta",
          details: "Rice, pasta, quinoa, couscous, oats, and other grains",
        },
        {
          name: "Cereal and Breakfast Foods",
          details: "Cereal, oatmeal, granola, pancake mix, and breakfast bars",
        },
        {
          name: "Canned Goods",
          details: "Canned vegetables, fruits, beans, soups, and sauces",
        },
        {
          name: "Household Essentials",
          details:
            "Cleaning products, paper towels, toilet paper, laundry detergent, and trash bags",
        },
        {
          name: "Personal Care",
          details:
            "Shampoo, conditioner, soap, toothpaste, deodorant, and personal hygiene products",
        },
        {
          name: "Baby Care",
          details: "Diapers, wipes, baby food, formula, and baby care products",
        },
        {
          name: "Baking Ingredients",
          details:
            "Flour, sugar, baking powder, baking soda, yeast, and cake mixes",
        },
        {
          name: "Spices and Seasonings",
          details:
            "Salt, pepper, herbs, spices, seasoning blends, and flavorings",
        },
        {
          name: "Nuts and Dried Fruits",
          details:
            "Almonds, peanuts, cashews, raisins, dried apricots, and mixed nuts",
        },
        {
          name: "Organic and Natural",
          details:
            "Organic produce, natural snacks, and products labeled as organic or non-GMO",
        },
        {
          name: "Tea and Coffee",
          details:
            "Tea bags, loose-leaf tea, ground coffee, coffee beans, and coffee accessories",
        },
        {
          name: "Ready-to-Eat Meals",
          details:
            "Pre-packaged meals, salads, sandwiches, and microwaveable dinners",
        },
        {
          name: "Pets",
          details:
            "Dry and wet pet food, treats, toys, and grooming products for pets",
        },
        {
          name: "Housewares",
          details:
            "Kitchen utensils, cookware, bakeware, storage containers, and kitchen gadgets",
        },
        {
          name: "Health and Wellness",
          details:
            "Vitamins, supplements, health foods, and products promoting well-being",
        },
        {
          name: "Others",
          details: "Miscellaneous items not falling into any other category or not categorized"
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // Remove the inserted data
    await queryInterface.bulkDelete("categories", null, {});
  },
};

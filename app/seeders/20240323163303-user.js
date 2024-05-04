"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Gabriel Ribeira",
          username: "gabriribeira",
          email: "gmrribeira@ua.pt",
          password: "12345678",
          img_url: "https://avatars.githubusercontent.com/u/68924149?v=4",
          description: "Student at University of Aveiro",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Carolina Baptista",
          username: "carolinabaptista",
          email: "carolina.baptista@ua.pt",
          password: "12345678",
          img_url: "https://avatars.githubusercontent.com/u/68924149?v=4",
          description: "Student at University of Aveiro",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Lara Mendes",
          username: "laramendes",
          email: "larammendes@ua.pt",
          password: "12345678",
          img_url: "https://avatars.githubusercontent.com/u/68924149?v=4",
          description: "Student at University of Aveiro",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Inês Sucena",
          username: "inesmsucena",
          email: "inesmsucena@ua.pt",
          password: "12345678",
          img_url: "https://avatars.githubusercontent.com/u/68924149?v=4",
          description: "Student at University of Aveiro",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Nathália Magalhães",
          username: "nathalia",
          email: "nathalia@ua.pt",
          password: "12345678",
          img_url: "https://avatars.githubusercontent.com/u/68924149?v=4",
          description: "Student at University of Aveiro",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Leo Coelho",
          username: "leonardo",
          email: "leonardo@ua.pt",
          password: "12345678",
          img_url: "https://avatars.githubusercontent.com/u/68924149?v=4",
          description: "Student at University of Aveiro",
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

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "households",
      [
        {
          name: "Casa da Amizade",
          img_url: "https://i.imgur.com/1.jpg",
          description:
            "Casa da Amizade é uma república de amigos que moram juntos e dividem as despesas.",
          privacy: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Casa da Praia",
          img_url: "https://i.imgur.com/2.jpg",
          description:
            "Casa da Praia é uma república de amigos que moram juntos e dividem as despesas.",
          privacy: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Casa do Sítio",
          img_url: "https://i.imgur.com/3.jpg",
          description:
            "Casa do Sítio é uma república de amigos que moram juntos e dividem as despesas.",
          privacy: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Casa do Sertão",
          img_url: "https://i.imgur.com/4.jpg",
          description:
            "Casa do Sertão é uma república de amigos que moram juntos e dividem as despesas.",
          privacy: false,
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

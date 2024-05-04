const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ETC API",
      description: "API documentation for ETC",
      contact: {
        name: "Gabriel Ribeira",
        email: "gmrribeira@ua.pt",
        url: "https://github.com/gabriribeira/etc",
      },
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3001/",
        description: "Local server",
      },
      {
        url: "https://gabrielribeira.com",
        description: "Live server",
      },
    ],
  },
  apis: ["app/controllers/*.js", "app/models/*.js", "app/routes/*.js", "app/migrations/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

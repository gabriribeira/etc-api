const express = require("express");
const cors = require("cors");
// import OpenAI from "openai";
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
require("dotenv").config();
const routeManager = require("./app/routes/route.manager.js");
const swaggerSpec = require("./app/config/swagger");
const swaggerUi = require("swagger-ui-express");
const passport = require('passport');
const { jwtStrategy } = require('./app/config/passport');

var corsOptions = {
  origin: "http://localhost:3001",
};

const app = express();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

async function dbConnect() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
dbConnect();

const db = require("./app/models");
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

//middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable("x-powered-by");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

routeManager(app);

//port
const PORT = process.env.PORT || 3001;

//server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

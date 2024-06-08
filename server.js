const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
require("dotenv").config();
const routeManager = require("./routes/route.manager.js");
const swaggerSpec = require("./config/swagger.js");
const swaggerUi = require("swagger-ui-express");
const passport = require("passport");
const http = require("http");
require("./config/mongo.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require('path');

var corsOptions = {
  origin: process.env.PLATFORM_FRONTEND_URL,
  credentials: true,
};

const app = express();
const server = http.createServer(app);

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

const db = require("./models");
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

const sessionMiddleware = session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'Lax',
  }
  // store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/etc" }),
});

// Middlewares
app.use(sessionMiddleware);
app.use(express.json());
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable("x-powered-by");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve static files from the React app located in public_html
app.use(express.static(path.join(__dirname, '../public_html')));

// Ensure the API routes are handled before the catch-all handler
routeManager(app);

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public_html', 'index.html'));
});

// Uncomment and configure socket.io if necessary
// io.use((socket, next) => {
//   sessionMiddleware(socket.request, {}, next);
// });

// io.on("connection", async (socket) => {
//   console.log("A client connected");

//   const userId = socket.request.session.passport?.user;
//   if (!userId) {
//     socket.emit("authentication_error", "User is not authenticated");
//     return;
//   }

//   try {
//     const user = await db.User.findByPk(userId, { include: [db.Household] });

//     if (!user) throw new Error("User not found");

//     const userHouseholds = user.Households.map((household) => household.id);

//     userHouseholds.forEach((householdId) => {
//       socket.join(`household-${householdId}`);
//     });

//     console.log(
//       `User ${userId} authenticated with households ${userHouseholds}`
//     );
//   } catch (error) {
//     console.error("Authentication error:", error.message);
//     socket.emit("authentication_error", error.message);
//   }

//   socket.on("disconnect", () => {
//     console.log("A client disconnected");
//   });
// });

// function emitNotificationToHousehold(householdId, notification) {
//   io.to(`household-${householdId}`).emit("notification", notification);
// }

// module.exports = { io, emitNotificationToHousehold };

// Port
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
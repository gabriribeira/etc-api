const auth = require("./auth.routes");
const category = require("./category.routes");
const expense = require("./expense.routes");
const goal = require("./goal.routes");
const goalrecord = require("./goalrecord.routes");
const household = require("./household.routes");
const item = require("./item.routes");
const list = require("./list.routes");
const role = require("./role.routes");
const specification = require("./specification.routes");
const tag = require("./tag.routes");
const user = require("./user.routes");
const product = require("./product.routes");

const routeManager = (app) => {
  app.use("/api/auth", auth);
  app.use("/api/categories", category);
  app.use("/api/expenses", expense);
  app.use("/api/goals", goal);
  app.use("/api/goalrecords", goalrecord);
  app.use("/api/households", household);
  app.use("/api/items", item);
  app.use("/api/products", product);
  app.use("/api/lists", list);
  app.use("/api/roles", role);
  app.use("/api/specifications", specification);
  app.use("/api/tags", tag);
  app.use("/api/users", user);
};

module.exports = routeManager;

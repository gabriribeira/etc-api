const db = require("../models");
const {
  Household,
  User,
  User_Household,
  Expense,
  Goal,
  GoalRecord,
  Specification,
  Item,
} = require("../models");
const jsend = require("jsend");

// Controller function to get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(jsend.success(users));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get a single user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json(jsend.error("User not found"));
    }
    res.status(200).json(jsend.success(user));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to create a new user
exports.createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(jsend.error(errors.message));
    }

    const { name, username, email, password, img_url, description } = req.body;
    const newUser = await User.create({
      name,
      username,
      email,
      password,
      img_url,
      description,
    });
    res.status(201).json(jsend.success(newUser));
  } catch (error) {
    res.status(400).json(jsend.error(error.message));
  }
};

// Controller function to update an existing user
exports.updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(jsend.error(errors.message));
    }

    const { id } = req.params;
    const { name, username, email, img_url, description } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json(jsend.error("User not found"));
    }
    await User.update(
      { name, username, email, img_url, description },
      { where: { id } }
    );
    res.status(200).json(jsend.success("User updated successfully"));
  } catch (error) {
    res.status(400).json(jsend.error(error.message));
  }
};

// Controller function to delete a user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json(jsend.error("User not found"));
    }
    await User.destroy({ where: { id } });
    res.status(204).json(jsend.success("User deleted successfully"));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all households of a user
exports.getUserHouseholds = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User_Household.findAll({
      where: { user_id: userId },
      include: Household,
    });
    if (!user) {
      return res.status(404).json(jsend.error("User not found"));
    }
    const households = user.map((user) => user.Household);
    res.status(200).json(jsend.success(households));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all items associated with a user
exports.getUserItems = async (req, res) => {
  const { userId } = req.params;
  try {
    const items = await Item.findAll({ where: { user_id: userId } });
    res.status(200).json(jsend.success(items));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all expenses associated with a user
exports.getUserExpenses = async (req, res) => {
  const { userId } = req.params;
  try {
    const expenses = await Expense.findAll({ where: { user_id: userId } });
    res.status(200).json(jsend.success(expenses));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all specifications associated with a user
exports.getUserSpecifications = async (req, res) => {
  const { userId } = req.params;
  try {
    const specifications = await Specification.findAll({
      where: { user_id: userId },
    });
    res.status(200).json(jsend.success(specifications));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all goals associated with a user
exports.getUserGoals = async (req, res) => {
  const { userId } = req.params;
  try {
    const goals = await Goal.findAll({ where: { user_id: userId } });
    res.status(200).json(jsend.success(goals));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all records of achieved goals by a user
exports.getUserGoalRecords = async (req, res) => {
  const { userId } = req.params;
  try {
    const goalRecords = await GoalRecord.findAll({
      where: { user_id: userId },
    });
    res.status(200).json(jsend.success(goalRecords));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};
const { Household, User, List, Expense, Goal, Tag } = require("../models");
const jsend = require("jsend");

// Controller function to get all households
exports.getAllHouseholds = async (req, res) => {
  try {
    const households = await Household.findAll();
    res.status(200).json(jsend.success(households));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get a single household by ID
exports.getHouseholdById = async (req, res) => {
  const { id } = req.params;
  try {
    const household = await Household.findByPk(id);
    if (!household) {
      return res.status(404).json(jsend.error("Household not found"));
    }
    res.status(200).json(jsend.success(household));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to create a new household
exports.createHousehold = async (req, res) => {
  try {
    // Extracting data from the request body
    const { name, img_url, description } = req.body;

    // Creating a new household
    const newHousehold = await Household.create({ name, img_url, description });
    res.status(201).json(jsend.success(newHousehold));
  } catch (error) {
    res.status(400).json(jsend.error("Invalid input"));
  }
};

// Controller function to update an existing household
exports.updateHousehold = async (req, res) => {
  try {
    // Extracting data from the request body
    const { id } = req.params;
    const { name, img_url, description } = req.body;

    // Finding the household by its ID
    const household = await Household.findByPk(id);
    if (!household) {
      return res.status(404).json(jsend.error("Household not found"));
    }

    // Updating the household
    await household.update({ name, img_url, description });
    res.status(201).json(jsend.success(household));
  } catch (error) {
    res.status(400).json(jsend.error("Invalid input"));
  }
};

// Controller function to delete a household
exports.deleteHousehold = async (req, res) => {
  const { id } = req.params;
  try {
    const household = await Household.findByPk(id);
    if (!household) {
      return res.status(404).json(jsend.error("Household not found"));
    }
    await household.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all users of a household
exports.getHouseholdUsers = async (req, res) => {
  const { householdId } = req.params;
  try {
    const household = await Household.findByPk(householdId, { include: User });
    if (!household) {
      return res.status(404).json(jsend.error("Household not found"));
    }
    const users = household.Users;
    res.status(200).json(jsend.success(users));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all lists associated with a household
exports.getHouseholdLists = async (req, res) => {
  const { householdId } = req.params;
  try {
    const lists = await List.findAll({ where: { household_id: householdId } });
    res.status(200).json(jsend.success(lists));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all expenses associated with a household
exports.getHouseholdExpenses = async (req, res) => {
  const { householdId } = req.params;
  try {
    const expenses = await Expense.findAll({
      where: { household_id: householdId },
    });
    res.status(200).json(jsend.success(expenses));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all goals associated with a household
exports.getHouseholdGoals = async (req, res) => {
  const { householdId } = req.params;
  try {
    const goals = await Goal.findAll({ where: { household_id: householdId } });
    res.status(200).json(jsend.success(goals));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all tags associated with a household
exports.getHouseholdTags = async (req, res) => {
  const { householdId } = req.params;
  try {
    const household = await Household.findByPk(householdId, { include: Tag });
    if (!household) {
      return res.status(404).json(jsend.error("Household not found"));
    }
    const tags = household.Tags;
    res.status(200).json(jsend.success(tags));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

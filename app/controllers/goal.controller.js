const { Goal, User } = require("../models");
const jsend = require("jsend");

// Controller function to get all goals
exports.getAllGoals = async (req, res) => {
  try {
    const goals = await Goal.findAll();
    res.status(200).json(jsend.success(goals));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get a single goal by ID
exports.getGoalById = async (req, res) => {
  const { id } = req.params;
  try {
    const goal = await Goal.findByPk(id);
    if (!goal) {
      return res.status(404).json(jsend.error("Goal not found"));
    }
    res.status(200).json(jsend.success(goal));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to create a new goal
exports.createGoal = async (req, res) => {
  const {
    title,
    details,
    periodicity,
    end_date,
    img_url,
    tag_id,
    household_id,
  } = req.body;
  try {
    const newGoal = await Goal.create({
      title,
      details,
      periodicity,
      end_date,
      img_url,
      tag_id,
      household_id,
    });
    res.status(201).json(jsend.success(newGoal));
  } catch (error) {
    res.status(400).json(jsend.error(error.message));
  }
};

// Controller function to update an existing goal
exports.updateGoal = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    details,
    periodicity,
    end_date,
    img_url,
    tag_id,
    household_id,
  } = req.body;
  try {
    const goal = await Goal.findByPk(id);
    if (!goal) {
      return res.status(404).json(jsend.error("Goal not found"));
    }
    await goal.update({
      title,
      details,
      periodicity,
      end_date,
      img_url,
      tag_id,
      household_id,
    });
    res.status(200).json(jsend.success(goal));
  } catch (error) {
    res.status(400).json(jsend.error(error.message));
  }
};

// Controller function to delete a goal
exports.deleteGoal = async (req, res) => {
  const { id } = req.params;
  try {
    const goal = await Goal.findByPk(id);
    if (!goal) {
      return res.status(404).json(jsend.error("Goal not found"));
    }
    await goal.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all users who are working on a goal
exports.getGoalUsers = async (req, res) => {
  const { goalId } = req.params;
  try {
    const goal = await Goal.findByPk(goalId, { include: User });
    if (!goal) {
      return res.status(404).json(jsend.error("Goal not found"));
    }
    const users = goal.Users;
    res.status(200).json(jsend.success(users));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

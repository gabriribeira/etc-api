const { Goal, User, Household_Goal, Tag, Goal_Record } = require("../models");
const jsend = require("jsend");
const { Op } = require("sequelize");

// Controller function to get all goals
exports.getAllGoals = async (req, res) => {
  try {
    const goals = await Goal.findAll();
    res.status(200).json(jsend.success(goals));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

exports.getGoalsByTags = async (req, res) => {
  try {
    const { tagIds } = req.body;

    if (!tagIds || !Array.isArray(tagIds)) {
      return res.status(400).json({ message: 'Invalid tag IDs provided' });
    }

    const goals = await Goal.findAll({
      where: {
        tag_id: tagIds,
      },
    });

    res.status(200).json(jsend.success(goals));
  } catch (error) {
    console.error('Error fetching goals by tags:', error);
    res.status(500).json({ message: 'Error fetching goals by tags', error });
  }
};

exports.assignGoalsToHousehold = async (req, res) => {
  try {
    const { householdId, goalIds } = req.body;

    if (!householdId || !Array.isArray(goalIds)) {
      return res.status(400).json({ message: 'Invalid household ID or goal IDs provided' });
    }

    for (const goalId of goalIds) {
      await Household_Goal.create({
        household_id: householdId,
        goal_id: goalId,
        start_date: new Date(),
        // 1 month after start date
        end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    res.status(200).json(jsend.success({ message: 'Goals assigned successfully' }));
  } catch (error) {
    console.error('Error assigning goals to household:', error);
    res.status(500).json({ message: 'Error assigning goals to household', error });
  }
};

// Increment Goal Progress
exports.incrementGoalProgress = async (req, res) => {
  const { householdGoalId, userId } = req.body;

  try {
    // Check if the user has already incremented today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const goalRecord = await Goal_Record.findOne({
      where: {
        household_goal_id: householdGoalId,
        user_id: userId,
        createdAt: {
          [Op.gte]: today,
        },
      },
    });

    if (goalRecord) {
      return res.status(400).json(jsend.fail({ message: 'You can only increment once a day' }));
    }

    // Get the current progress
    const householdGoal = await Household_Goal.findOne({
      where: { id: householdGoalId },
      include: [
        {
          model: Goal_Record,
          where: { household_goal_id: householdGoalId },
          required: false, // This allows the query to return the householdGoal even if there are no Goal_Records
        },
        {
          model: Goal,
          include: [Tag],
        }
      ],
    });

    if (!householdGoal) {
      return res.status(404).json(jsend.error('Household Goal not found'));
    }

    const currentProgress = householdGoal.Goal_Records.length;

    // Create a new goal record
    const newGoalRecord = await Goal_Record.create({
      household_goal_id: householdGoalId,
      user_id: userId,
      increment_value: 1,
      value_after_increment: currentProgress + 1,
    });

    console.log('Goal Data', householdGoal);

    // Check if the goal is completed after increment
    const isCompleted = currentProgress + 1 >= householdGoal.Goal.amount;
    if (isCompleted) {
      householdGoal.is_completed = true;
      await householdGoal.save();
      return res.status(200).json(jsend.success({ ...newGoalRecord.toJSON(), is_completed: true }));
    }

    res.status(201).json(jsend.success(newGoalRecord));
  } catch (error) {
    console.error('Error incrementing goal:', error);
    res.status(500).json(jsend.error('Error incrementing goal', error));
  }
};

// Get Active Household Goals
exports.getActiveHouseholdGoals = async (req, res) => {
  const { householdId } = req.params;

  try {
    const householdGoals = await Household_Goal.findAll({
      where: {
        household_id: householdId,
        is_finished: false,
        is_completed: false,
      },
      attributes: ['id', 'start_date', 'end_date', 'household_id', 'goal_id', 'is_completed', 'is_finished', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Goal,
          include: [Tag],
        },
      ],
    });

    if (!householdGoals.length) {
      return res.status(200).json(jsend.success({ message: 'No goals found for this household' }));
    }

    res.status(200).json(jsend.success(householdGoals));
  } catch (error) {
    console.error("Error fetching active household goals:", error);
    res.status(500).json(jsend.error("Error fetching active household goals", error));
  }
};

// Get Household Goal Progress
exports.getHouseholdGoalProgress = async (req, res) => {
  const { householdGoalId } = req.params;

  try {
    const goalProgress = await Goal_Record.findAll({
      where: {
        household_goal_id: householdGoalId,
      },
      attributes: ['id', 'household_goal_id', 'user_id', 'increment_value', 'value_after_increment', 'createdAt', 'updatedAt'],
    });

    res.status(200).json(jsend.success(goalProgress));
  } catch (error) {
    console.error("Error fetching household goal progress:", error);
    res.status(500).json(jsend.error("Error fetching household goal progress", error));
  }
};

// Get Completed Household Goals
exports.getCompletedHouseholdGoals = async (req, res) => {
  const { householdId } = req.params;

  try {
    const completedGoals = await Household_Goal.findAll({
      where: { household_id: householdId, is_completed: true },
      attributes: ['id', 'start_date', 'end_date', 'household_id', 'goal_id', 'created_at', 'updated_at'],
      include: [
        {
          model: Goal,
          include: [Tag],
        },
        {
          model: Goal_Record,
        },
      ],
    });

    if (!completedGoals.length) {
      return res.status(200).json(jsend.success({ message: 'No completed goals found for this household' }));
    }

    res.status(200).json(jsend.success(completedGoals));
  } catch (error) {
    console.error("Error fetching completed household goals:", error);
    res.status(500).json(jsend.error("Error fetching completed household goals", error));
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

exports.finishExpiredGoals = async () => {
  try {
    const now = new Date();

    // Find all household goals that have expired
    const expiredGoals = await Household_Goal.findAll({
      where: {
        end_date: {
          [Op.lt]: now,
        },
        is_finished: false,
        is_completed: false,
      },
    });

    // Mark each expired goal as finished
    for (const goal of expiredGoals) {
      goal.is_finished = true;
      goal.is_completed = false;
      await goal.save();
    }

    console.log(`Finished ${expiredGoals.length} expired goals.`);
  } catch (error) {
    console.error('Error finishing expired goals:', error);
  }
};
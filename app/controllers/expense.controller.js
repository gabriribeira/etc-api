const { Expense, User, Expense_User } = require("../models");
const jsend = require("jsend");

// Controller function to get all expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      include: [
        {
          model: User,
          through: { attributes: ["is_paid"] },
          as: 'users',
        },
      ],
    });
    res.status(200).json(jsend.success(expenses));
  } catch (error) {
    res.status(500).json(jsend.fail(error.message));
  }
};


// Controller function to get a single expense by ID
exports.getExpenseById = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findByPk(id, {
      include: [
        {
          model: User,
          through: { attributes: [] },
          as: 'users',
        },
      ],
    });
    if (!expense) {
      return res.status(404).json(jsend.error("Expense not found"));
    }
    res.status(200).json(jsend.success(expense));
  } catch (error) {
    res.status(500).json(jsend.fail(error.message));
  }
};


// Controller function to create a new expense
exports.createExpense = async (req, res) => {
  const { user_id, title, details, date, value, is_paid, members } = req.body;
  const { currentHouseholdId } = req.session;
  try {
    const newExpense = await Expense.create({
      user_id,
      household_id: currentHouseholdId,
      title,
      date,
      details,
      value,
      is_paid,
    });

    if (members) {
      members.forEach(async (member) => {
        await newExpense.addUser(member);
      });
    }

    res.status(201).json(jsend.success(newExpense));
  } catch (error) {
    res.status(500).json(jsend.fail(error.message));
  }
};

// Controller function to update an existing expense
exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const { user_id, title, details, value, is_paid } = req.body;
  try {
    const expense = await Expense.findByPk(id);
    if (!expense) {
      return res.status(404).json(jsend.error("Expense not found"));
    }
    await expense.update({ user_id, title, details, value, is_paid });
    res.status(200).json(jsend.success(expense));
  } catch (error) {
    res.status(500).json(jsend.fail(error.message));
  }
};

// Controller function to delete an expense
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findByPk(id);
    if (!expense) {
      return res.status(404).json(jsend.error("Expense not found"));
    }
    await expense.destroy();
    res.status(204).json(jsend.success());
  } catch (error) {
    res.status(500).json(jsend.fail(error.message));
  }
};

// Controller function to get all users who participated in an expense
exports.getExpenseUsers = async (req, res) => {
  const { expenseId } = req.params;
  try {
    const expense = await Expense.findByPk(expenseId, { include: User });
    if (!expense) {
      return res.status(404).json(jsend.error("Expense not found"));
    }
    const users = expense.Users;
    res.status(200).json(jsend(users));
  } catch (error) {
    res.status(500).json(jsend.fail(error.message));
  }
};

// Controller function to mark an expense as paid by a specific user
exports.markExpenseAsPaidByUser = async (req, res) => {
  const { expenseId, userId } = req.params;
  try {
    const expense = await Expense.findByPk(expenseId);
    if (!expense) {
      return res.status(404).json(jsend.error("Expense not found"));
    }
    await expense.addUser(userId);
    res.status(204).json(jsend.success("Expense marked as paid by the user"));
  } catch (error) {
    res.status(500).json(jsend.fail(error.message));
  }
};

// Controller function to get all expenses within a certain date range
exports.getExpensesByDateRange = async (req, res) => {
  const { startDate, endDate } = req.params;
  try {
    const expenses = await Expense.findAll({
      where: {
        created_at: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    res.status(200).json(jsend.success(expenses));
  } catch (error) {
    res.status(500).json(jsend.fail(error.message));
  }
};

const { Expense, User, Expense_User } = require("../models");
const jsend = require("jsend");
const { Op } = require("sequelize");

// Controller function to get all expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the authenticated user's ID is available in req.user.id

    const expenses = await Expense.findAll({
      where: {
        is_paid: false,
        [Op.or]: [
          { user_id: userId },
          {
            '$users.id$': userId
          }
        ]
      },
      include: [
        {
          model: User,
          as: 'users',
          through: { attributes: ["is_paid"] },
        },
        {
          model: User,
          as: 'payer',
          attributes: ['id', 'name', 'img_url'], // Include the necessary user attributes
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
          as: "payer",
          attributes: ["id", "name", "img_url"],
        },
        {
          model: User,
          as: "users",
          through: {
            attributes: ["is_paid"], // Include the is_paid attribute
          },
          attributes: ["id", "name", "img_url"],
        },
      ],
    });

    if (!expense) {
      return res.status(404).json(jsend.error("Expense not found"));
    }

    res.status(200).json(jsend.success(expense));
  } catch (error) {
    console.error("Error fetching expense:", error);
    res.status(500).json(jsend.error("Error fetching expense"));
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

    if (members && members.length > 0) {
      const expenseUsers = members.map((member) => ({
        expense_id: newExpense.id,
        user_id: member,
        is_paid: member === user_id,
      }));
      await Expense_User.bulkCreate(expenseUsers);
    }

    res.status(201).json(jsend.success(newExpense));
  } catch (error) {
    console.error("Error creating expense:", error);
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
  const userId = req.session.passport.user; // Assuming user authentication is handled via session

  try {
    const expense = await Expense.findByPk(id);
    if (!expense) {
      return res.status(404).json(jsend.error("Expense not found"));
    }

    // Check if the authenticated user is the payer
    if (expense.user_id !== userId) {
      return res.status(403).json(jsend.error("You are not authorized to delete this expense"));
    }

    await expense.destroy();
    res.status(204).json({ message: 'Expense deleted successfully' });
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

// Controller function to mark the whole expense as paid
exports.markWholeExpenseAsPaid = async (req, res) => {
  const { expenseId } = req.body;
  const userId = req.session.passport.user;

  try {
    // Fetch the expense
    const expense = await Expense.findByPk(expenseId, {
      include: [{ model: User, as: "users" }]
    });

    if (!expense) {
      return res.status(404).json(jsend.error("Expense not found"));
    }

    // Check if the authenticated user is the payer
    if (expense.user_id !== userId) {
      return res.status(403).json(jsend.error("Only the payer can mark the expense as paid"));
    }

    // Mark the expense as paid
    expense.is_paid = true;
    await expense.save();

    res.status(200).json(jsend.success(expense));
  } catch (error) {
    console.error("Error marking the whole expense as paid:", error);
    res.status(500).json(jsend.error("Error marking the whole expense as paid"));
  }
};

// Controller function to mark an expense as paid by a specific user
exports.markExpenseAsPaidByUser = async (req, res) => {
  const userId = req.session.passport.user;
  const { expenseId } = req.body;

  try {
    const expense = await Expense.findByPk(expenseId, {
      include: [
        {
          model: User,
          as: "users",
          through: { attributes: ["is_paid"] },
        },
      ],
    });

    if (!expense) {
      return res.status(404).json(jsend.error("Expense not found"));
    }

    const userExpense = await Expense_User.findOne({
      where: { expense_id: expenseId, user_id: userId }
    });

    if (!userExpense) {
      return res.status(404).json(jsend.error("User not part of this expense"));
    }

    // Update the is_paid field
    await userExpense.update({ is_paid: true });

    // Check if all users have marked the expense as paid
    const unpaidUsers = await Expense_User.findAll({
      where: { expense_id: expenseId, is_paid: false },
    });

    if (unpaidUsers.length === 0) {
      await expense.update({ is_paid: true });
    }

    res.status(200).json(jsend.success({ message: "Expense marked as paid by user" }));
  } catch (error) {
    console.error("Error marking expense as paid by user:", error);
    res.status(500).json(jsend.error("Error marking expense as paid by user"));
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

const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense.controller.js");
const {
  validateCreateExpense,
  validateUpdateExpense,
} = require("../validations/expense.validation.js");
const { handleValidationErrors } = require("../middlewares/validation.js");

/**
 * @openapi
 * /expenses:
 *   get:
 *     summary: Retrieve all expenses
 *     description: Retrieve a list of all expenses.
 *     responses:
 *       200:
 *         description: A list of all expenses.
 *       500:
 *         description: Internal server error.
 */
router.get("/", expenseController.getAllExpenses);

/**
 * @openapi
 * /expenses/{id}:
 *   get:
 *     summary: Retrieve an expense by ID
 *     description: Retrieve a single expense by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the expense to retrieve.
 *     responses:
 *       200:
 *         description: The requested expense.
 *       404:
 *         description: Expense not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", expenseController.getExpenseById);

/**
 * @openapi
 * /expenses:
 *   post:
 *     summary: Create a new expense
 *     description: Create a new expense record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *          type: string
 *         description: ID of the user creating the expense.
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *          type: string
 *         description: Title of the expense.
 *       - in: path
 *         name: details
 *         required: true
 *         schema:
 *          type: string
 *         description: Details of the expense.
 *       - in: path
 *         name: value
 *         required: true
 *         schema:
 *          type: number
 *         description: Value of the expense.
 *       - in: path
 *         name: is_paid
 *         required: true
 *         schema:
 *          type: boolean
 *         description: Whether the expense has been paid.
 *     responses:
 *       201:
 *         description: The created expense.
 *       400:
 *         description: Invalid request body.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/",
  validateCreateExpense,
  handleValidationErrors,
  expenseController.createExpense
);

/**
 * @openapi
 * /expenses/{id}:
 *   put:
 *     summary: Update an existing expense
 *     description: Update an existing expense record.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the expense to update.
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *          type: string
 *         description: ID of the user creating the expense.
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *          type: string
 *         description: Title of the expense.
 *       - in: path
 *         name: details
 *         required: true
 *         schema:
 *          type: string
 *         description: Details of the expense.
 *       - in: path
 *         name: value
 *         required: true
 *         schema:
 *          type: number
 *         description: Value of the expense.
 *       - in: path
 *         name: is_paid
 *         required: true
 *         schema:
 *          type: boolean
 *         description: Whether the expense has been paid.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       200:
 *         description: The updated expense.
 *       400:
 *         description: Invalid request body or ID.
 *       404:
 *         description: Expense not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/:id",
  validateUpdateExpense,
  handleValidationErrors,
  expenseController.updateExpense
);

/**
 * @openapi
 * /expenses/{id}:
 *   delete:
 *     summary: Delete an expense
 *     description: Delete an existing expense record.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the expense to delete.
 *     responses:
 *       204:
 *         description: Expense deleted successfully.
 *       404:
 *         description: Expense not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", expenseController.deleteExpense);

/**
 * @openapi
 * /expenses/{expenseId}/users:
 *   get:
 *     summary: Get users participating in an expense
 *     description: Retrieve a list of users who participated in a specific expense.
 *     parameters:
 *       - in: path
 *         name: expenseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the expense.
 *     responses:
 *       200:
 *         description: A list of users participating in the expense.
 *       404:
 *         description: Expense not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:expenseId/users", expenseController.getExpenseUsers);

/**
 * @openapi
 * /expenses/mark-paid:
 *   post:
 *     summary: Mark an expense as paid by a user
 *     description: Mark a specific expense as paid by a user.
 *     parameters:
 *       - in: path
 *         name: expenseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the expense.
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user marking the expense as paid.
 *     responses:
 *       200:
 *         description: Expense marked as paid successfully.
 *       404:
 *         description: Expense or user not found.
 *       500:
 *         description: Internal server error.
 */
router.post("/mark-paid", expenseController.markExpenseAsPaidByUser);

/**
 * @openapi
 * /expenses/mark-whole-paid:
 *  post:
 *   summary: Mark the whole expense as paid
 *  description: Mark the whole expense as paid by the payer.
 * parameters:
 *  - in: path
 *   name: expenseId
 *  required: true
 * schema:
 * type: string
 * description: ID of the expense.
 * responses:
 * 200:
 * description: Expense marked as paid successfully.
 * 404:
 * description: Expense not found.
 * 500:
 * description: Internal server error.
 */
router.post("/mark-whole-paid", expenseController.markWholeExpenseAsPaid);

/**
 * @openapi
 * /expenses/date/{startDate}/{endDate}:
 *   get:
 *     summary: Get expenses within a date range
 *     description: Retrieve a list of expenses within a specified date range.
 *     parameters:
 *       - in: path
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *         description: Start date of the range (YYYY-MM-DD).
 *       - in: path
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *         description: End date of the range (YYYY-MM-DD).
 *     responses:
 *       200:
 *         description: A list of expenses within the date range.
 *       400:
 *         description: Invalid date format.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/date/:startDate/:endDate",
  expenseController.getExpensesByDateRange
);

module.exports = router;

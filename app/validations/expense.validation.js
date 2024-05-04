const { body, param } = require("express-validator");

exports.validateCreateExpense = [
  body("user_id").notEmpty().withMessage("User ID is required"),
  body("title").notEmpty().withMessage("Title is required"),
  body("value").notEmpty().withMessage("Value is required"),
];

exports.validateUpdateExpense = [
  param("id").notEmpty().withMessage("Expense ID is required"),
  body("user_id").notEmpty().withMessage("User ID is required"),
  body("title").notEmpty().withMessage("Title is required"),
  body("value").notEmpty().withMessage("Value is required"),
  body("is_paid").notEmpty().withMessage("Is paid status is required"),
];

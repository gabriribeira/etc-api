const { body, validationResult } = require("express-validator");

// Validation middleware for creating a new user
exports.validateCreateUser = [
  body("email").isEmail().withMessage("Invalid email format"),
];

// Validation middleware for updating an existing user
exports.validateUpdateUser = [
  body("name").optional().isLength({ max: 64 }).withMessage("Name must be between 2 and 64 characters"),
];
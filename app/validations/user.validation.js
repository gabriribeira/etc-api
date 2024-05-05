const { body, validationResult } = require("express-validator");

// Validation middleware for creating a new user
exports.validateCreateUser = [
  body("email").isEmail().withMessage("Invalid email format"),
];

// Validation middleware for updating an existing user
exports.validateUpdateUser = [
  body("name").optional().isLength({ max: 64 }).withMessage("Name must be between 2 and 64 characters"),
  body("username").optional().isLength({ min: 3, max: 28 }).withMessage("Username must be between 3 and 28 characters"),
  body("email").optional().isEmail().withMessage("Invalid email format"),
  body("img_url").optional().isURL().withMessage("Invalid image URL format"),
  body("description").optional().isLength({ max: 512 }).withMessage("Description cannot exceed 512 characters"),
];
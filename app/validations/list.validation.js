const { body, validationResult } = require("express-validator");

// Validation middleware for creating a new list
exports.validateCreateList = [
  body("name").notEmpty().withMessage("Name is required"),
  // Add more validation rules as needed for other fields
];

// Validation middleware for updating an existing list
exports.validateUpdateList = [
  body("name").notEmpty().withMessage("Name is required"),
  // Add more validation rules as needed for other fields
];

const { body, validationResult } = require("express-validator");

// Validation middleware for creating a new item
exports.validateCreateItem = [
  body("name").notEmpty().withMessage("Name is required"),
  // Add more validation rules as needed for other fields
];

// Validation middleware for updating an existing item
exports.validateUpdateItem = [
  body("name").notEmpty().withMessage("Name is required"),
  // Add more validation rules as needed for other fields
];
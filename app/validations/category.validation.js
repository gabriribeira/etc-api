const { body } = require("express-validator");

// Validation middleware for creating a new specification
exports.validateCreateCategory = [
  body("name").notEmpty().withMessage("Name is required"),
  body("details").notEmpty().withMessage("Details are required"),
];

// Validation middleware for updating an existing specification
exports.validateUpdateCategory = [
  body("name").notEmpty().withMessage("Name is required"),
  body("details").notEmpty().withMessage("Details are required"),
];
const { body, validationResult } = require("express-validator");

// Validation middleware for creating a new specification
exports.validateCreateSpecification = [
  body("name").notEmpty().withMessage("Name is required"),
  body("details").notEmpty().withMessage("Details are required"),
];

// Validation middleware for updating an existing specification
exports.validateUpdateSpecification = [
  body("name").notEmpty().withMessage("Name is required"),
  body("details").notEmpty().withMessage("Details are required"),
];
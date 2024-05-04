const { body, validationResult } = require("express-validator");

// Validation middleware for creating a new household
exports.validateCreateHousehold = [
  body("name").notEmpty().withMessage("Name is required"),
  // Add more validation rules as needed for other fields
];

// Validation middleware for updating an existing household
exports.validateUpdateHousehold = [
  body("name").notEmpty().withMessage("Name is required"),
  // Add more validation rules as needed for other fields
];
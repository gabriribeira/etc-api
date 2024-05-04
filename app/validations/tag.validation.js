const { body, validationResult } = require("express-validator");

// Validation middleware for creating a new tag
exports.validateCreateTag = [
  body("title").notEmpty().withMessage("Title is required"),
];

// Validation middleware for updating an existing tag
exports.validateUpdateTag = [
  body("title").notEmpty().withMessage("Title is required"),
];

const { body, validationResult } = require("express-validator");

// Validation middleware for creating a new role
exports.validateCreateRole = [
  body("title").notEmpty().withMessage("Title is required"),
  body("details").optional().isLength({ max: 255 }).withMessage("Details cannot exceed 255 characters"),
];

// Validation middleware for updating an existing role
exports.validateUpdateRole = [
  body("title").notEmpty().withMessage("Title is required"),
  body("details").optional().isLength({ max: 255 }).withMessage("Details cannot exceed 255 characters"),
];

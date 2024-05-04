const { body, validationResult } = require("express-validator");

exports.validateCreateGoalRecord = [
  body("tagId").notEmpty().withMessage("Tag ID is required"),
  body("userId").notEmpty().withMessage("User ID is required"),
  body("incrementValue").notEmpty().withMessage("Increment value is required"),
  body("valueAfterIncrement").notEmpty().withMessage("Value after increment is required"),
];

exports.validateUpdateGoalRecord = [
  body("tagId").notEmpty().withMessage("Tag ID is required"),
  body("userId").notEmpty().withMessage("User ID is required"),
  body("incrementValue").notEmpty().withMessage("Increment value is required"),
  body("valueAfterIncrement").notEmpty().withMessage("Value after increment is required"),
];
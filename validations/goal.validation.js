const { body, validationResult } = require("express-validator");

exports.validateCreateGoal = [
  body("title").notEmpty().withMessage("Title is required"),
  body("details").optional().isLength({ max: 255 }).withMessage("Details cannot exceed 255 characters"),
  body("periodicity").notEmpty().withMessage("Periodicity is required"),
  body("end_date").notEmpty().withMessage("End date is required"),
  body("img_url").notEmpty().withMessage("Image URL is required"),
  body("tag_id").notEmpty().withMessage("Tag ID is required"),
  body("household_id").notEmpty().withMessage("Household ID is required"),
];

exports.validateUpdateGoal = [
  body("tagId").notEmpty().withMessage("Tag ID is required"),
  body("userId").notEmpty().withMessage("User ID is required"),
  body("incrementValue").notEmpty().withMessage("Increment value is required"),
  body("valueAfterIncrement")
    .notEmpty()
    .withMessage("Value after increment is required"),
];
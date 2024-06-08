const jsend = require('jsend');
const { validationResult } = require('express-validator');

exports.handleValidationErrors = (req, res, next) => {
  console.log('Handling validation errors');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Extract error messages from the validation result
    const errorMessages = errors.array().map(error => error.msg);
    // Return validation errors using jsend.error
    return res.status(400).json(jsend.error('Validation failed', { errors: errorMessages }));
  }
  next();
};

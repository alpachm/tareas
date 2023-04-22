const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Passowrd cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Must be a password of at least 8 characters'),
  validFields,
];

exports.createRepairValidation = [
  body('date')
    .notEmpty()
    .withMessage('Date cannot be empty')
    .isDate()
    .withMessage('Must be a valid date'),
  body('motorsNumber')
    .notEmpty()
    .withMessage('Motors number cannot be empty')
    .isNumeric()
    .withMessage('Must be a valid motors number'),
  body('description')
    .notEmpty()
    .withMessage('Description cannot be emtpy')
    .isString()
    .withMessage('Must be a valid description'),
  body('userId')
    .notEmpty()
    .withMessage('User ID cannot be empty')
    .isNumeric()
    .withMessage('Must be a valid user ID'),
  validFields,
];

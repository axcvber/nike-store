import { body, check, oneOf } from 'express-validator'

export const registerSchema = [
  body('email', 'Please enter a valid email address.').isEmail(),

  check('password')
    .isString()
    .withMessage('Field must be a string')
    .isLength({ min: 8, max: 36 })
    .withMessage('Symbol limit from 8 to 36')
    .matches(/.*[A-Z].*/)
    .withMessage('1 uppercase letter')
    .matches(/.*[a-z].*/)
    .withMessage('1 lowercase letter')
    .matches(/\d/)
    .withMessage('must contain a number'),

  body('firstName', 'Please enter a valid first name.')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Please enter a first name.')
    .isLength({ max: 40 })
    .withMessage('First name cannot exceed 40 characters.')
    .matches(/^([^0-9]*)$/)
    .withMessage('First name should not contains numbers.'),
  body('lastName', 'Please enter a valid last name.')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Please enter a last name.')
    .isLength({ max: 40 })
    .withMessage('Last name cannot exceed 40 characters.')
    .matches(/^([^0-9]*)$/)
    .withMessage('Last name should not contains numbers.'),

  body('dateOfBirth', 'Please enter a valid date of birth.')
    .isISO8601()
    .notEmpty()
    .withMessage('Please enter a date of birth.'),

  body('country', 'Please enter a valid country.').isString().notEmpty().withMessage('Please enter a country.'),
  body('gender', 'Please select a valid preference.').isString().notEmpty().withMessage('Please select a preference.'),
  body('subscribe').isBoolean(),

  // body('password', 'Enter password')
  //   .isString()
  //   .isLength({
  //     min: 6,
  //   })
  //   .withMessage('Password must have min 6 symbol')
  //   .custom((value, { req }) => {
  //     if (value !== req.body.password2) {
  //       throw new Error('Password is not match ')
  //     } else {
  //       return value
  //     }
  //   }),
  // oneOf([
  //   check('programming_language').isIn(['javascript', 'java', 'php']),
  //   check('design_tools').isIn(['canva', 'photoshop', 'gimp']),
  // ]),
]

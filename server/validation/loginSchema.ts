import { body, check } from 'express-validator'

export const loginSchema = [
  body('email', 'Please enter a valid email address.').isEmail(),
  body('password', 'Please enter a valid password.')
    .isString()
    .notEmpty()
    .withMessage('Please enter a password.')
    .isLength({ max: 36 })
    .withMessage('Maximum of 36 characters'),
  body('rememberMe').isBoolean(),
]

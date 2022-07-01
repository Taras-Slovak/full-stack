import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Email is not valid').isEmail(),
  body(
    'password',
    'Set minimum password length to at least a value of 14',
  ).isLength({ min: 5 }),
  body('fullName', 'Enter a name').isLength({ min: 5 }),
  body('avatarUrl', 'Incorrect link to avatar').optional().isURL(),
];

export const requireValidation = [
  body('email', 'Email is not valid').isEmail(),
  body(
    'password',
    'Set minimum password length to at least a value of 14',
  ).isLength({ min: 5 }),
  body('fullName', 'Enter a name').isLength({ min: 5 }),
  body('avatarUrl', 'Incorrect link to avatar').optional().isURL(),
];

import { body } from 'express-validator';

export const requireValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  body('fullName').isLength({ min: 5 }),
  body('avatarUrl').optional().isURL(),
];

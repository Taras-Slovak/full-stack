import { body } from 'express-validator';

export const requireValidation = [
  body('email').isEmail(),
  body('password').isLatLong({ min: 5 }),
  body('fullName').isLatLong({ min: 5 }),
  body('avatarUrl').optional().isURL(),
];

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

export const registerValidation = [
  body('email', 'Email is not valid').isEmail(),
  body(
    'password',
    'Set minimum password length to at least a value of 14',
  ).isLength({ min: 5 }),
  body('fullName', 'Enter a name').isLength({ min: 5 }),
  body('avatarUrl', 'Incorrect link to avatar').optional().isURL(),
];

export const postCreateValidation = [
  body('title', 'Enter the article title').isLength({ min: 3 }).isString(),
  body('text', 'Enter the text of the article')
    .isLength({ min: 10 })
    .isString(),
  body('tags', 'EInvalid tag format (Specify an array)').optional().isString(),
  body('imageUrl', 'The image link is incorrect').optional().isString(),
];

import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import { requireValidation } from './validations/auth.js';

mongoose
  .connect(
    'mongodb+srv://TarasFromUa:ad3037KYZ@blog.rkhn2ff.mongodb.net/?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('DB OK');
  })
  .catch((err) => {
    console.log('DB error', err);
  });

const app = express();

app.use(express.json());

app.post('/auth/register', requireValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  res.json({
    success: true,
  });
});

const port = 1456;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is starting on http://localhost:${1456}`);
});

import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import { requireValidation } from './validations/auth.js';

import UserModel from './models/User.js';

mongoose
  .connect(
    'mongodb+srv://TarasFromUa:ad3037KYZ@blog.rkhn2ff.mongodb.net/blog?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('DB OK');
  })
  .catch((err) => {
    console.log('DB error', err);
  });

const app = express();

app.use(express.json());

app.post('/auth/register', requireValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash,
    });

    const user = await doc.save();

    res.json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Can not register',
    });
  }
});

const port = 1456;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is starting on http://localhost:${1456}`);
});

import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import { requireValidation } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';
import { getMe, login, register } from './controllers/UserController.js';

const myPass = process.env.PASS;

mongoose
  .connect(
    `mongodb+srv://TarasFromUa:ad3037KYZ@blog.rkhn2ff.mongodb.net/blog?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log('DB OK');
  })
  .catch((err) => {
    console.log('DB error', err);
  });

const app = express();

app.use(express.json());

app.post('/auth/login', login);

app.post('/auth/register', requireValidation, register);

app.get('/auth/me', checkAuth, getMe);

const port = 1456;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is starting on http://localhost:${1456}`);
});

import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import {
  loginValidation,
  postCreateValidation,
  requireValidation,
} from './validations.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

const myPass = process.env.PASS;

mongoose
  .connect(
    `mongodb+srv://TarasFromUa:${myPass}@blog.rkhn2ff.mongodb.net/blog?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log('DB OK');
  })
  .catch((err) => {
    console.log('DB error', err);
  });

const app = express();

app.use(express.json());

app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', requireValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

// app.get('/posts',  PostController.getAll);
// app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
// app.delete('/posts/:id', checkAuth, PostController.remove);
// app.patch('/posts/:id', checkAuth, PostController.update);

const port = 1456;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is starting on http://localhost:${1456}`);
});

import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

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

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.post('/auth/login', (req, res) => {
  console.log(req.body);

  const token = jwt.sign(
    {
      email: req.body.email,
      fullName: 'Taras Slovak',
    },
    'secret123',
  );

  res.json({
    success: true,
    token,
  });
});

const port = 1456;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Start');
});

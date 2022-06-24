import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.post('/auth/login', (req, res) => {
  console.log(req.body);
  res.json({
    success: true,
  });
});

const port = 1456;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Start');
});

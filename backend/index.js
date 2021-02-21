/* eslint-disable no-console */
const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/:param', (req, res) => {
  res.send(`Hello World, ${req.params.param}`);
});

app.listen(process.env.PORT || 9000, () => console.log('Server up!'));

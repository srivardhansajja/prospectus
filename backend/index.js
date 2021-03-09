/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const connection = require('./db');

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
  connection.query('SELECT * FROM `TEST`', (error, results, fields) => {
    if (error) { throw error; }
    res.json(results);
    res.end();
  });
});

app.get('/:param', (req, res) => {
  res.send(`Hello World, ${req.params.param}`);
});

app.listen(process.env.PORT || 9000, () => console.log('Server up!'));

/* eslint-disable no-console */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connection = require('./db');

const queries = require('./queries.js');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// route for home
app.get('/', (req, res) => {
  res.send('Home route reached!');
});

// route for returning search results
app.get('/search', (req, res) => {
  const sql = queries.Search;
  const { dept, keywords, userid } = req.query.dept;

  connection.query(
    sql,
    [keywords, dept, keywords, dept, userid],
    (err, data) => {
      if (err) throw err;
      res.json({
        status: 200,
        length: Object.keys(data).length,
        data,
        message: 'Search results returned successfully',
      });
    },
  );
});

// route for querying all courses in a user's wishlist
app.get('/user/wishlist', (req, res) => {
  const sql = queries.wishlistQuery;
  const { userid, keywords } = req.query.userid;

  connection.query(sql, [userid, keywords], (err, data) => {
    if (err) throw err;
    res.json({
      status: 200,
      length: Object.keys(data).length,
      data,
      message: "User's wishlist returned successfully",
    });
  });
});

// route for adding entry from wishlist
app.post('/user/wishlist', (req, res) => {
  const sql = queries.wishlistInsert;
  const { userid, courseid } = req.body.userid;

  connection.query(sql, [userid, courseid, courseid], (err, data) => {
    if (err) {
      res.json({
        status: 400,
        message: 'Duplicate',
      });
    } else {
      res.json({
        status: 200,
        length: Object.keys(data).length,
        data,
        message: "Course added to user's wishlist successfully",
      });
    }
  });
});

// route for updating entry in wishlist
app.post('/user/wishlist/update', (req, res) => {
  const sql = queries.wishlistUpdate;
  const { userid, courseid, desc } = req.body.userid;

  console.log(req.body);
  connection.query(sql, [desc, courseid, userid], (err, data) => {
    if (err) throw err;
    res.json({
      status: 200,
      length: Object.keys(data).length,
      data,
      message: 'Course in wishlist updated successfully',
    });
  });
});

// route for deleting entry from wishlist
app.delete('/user/wishlist', (req, res) => {
  const sql = queries.wishlistDelete;
  const { userid, courseid } = req.query.userid;

  connection.query(sql, [userid, courseid], (err, data) => {
    if (err) throw err;
    res.json({
      status: 200,
      length: Object.keys(data).length,
      data,
      message: "Course deleted from user's wishlist successfully",
    });
  });
});

// route for querying all courses that a user has taken
app.get('/user/coursesTaken', (req, res) => {
  const sql = queries.coursesTakenQuery;
  const { userid } = req.query.userid;

  connection.query(sql, [userid], (err, data) => {
    if (err) throw err;
    res.json({
      status: 200,
      length: Object.keys(data).length,
      data,
      message: 'Courses taken returned successfully',
    });
  });
});

// app.get("/:param", (req, res) => {
//   res.send(`Hello World, ${req.params.param}`);
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

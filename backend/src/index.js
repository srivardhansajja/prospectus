/* eslint-disable no-console */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const client = new OAuth2Client(process.env.CLIENT_ID);
const connection = require('./db');

const queries = require('./queries');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

// https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
// eslint-disable-next-line consistent-return
function authUser(req, res, next) {
  const { token } = req.cookies;
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, { id }) => {
    if (err) return res.sendStatus(403);

    req.user = id;

    next();
  });
}

// route for home
app.get('/', (req, res) => {
  res.send('Home route reached!');
});

app.post('/login', async (req, res) => {
  const { idToken } = req.body;
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.CLIENT_ID,
  });

  const {
    hd, email, name, picture, sub,
  } = ticket.getPayload();

  const query = 'INSERT IGNORE INTO Prospectus.Users SET UserId = ?, Name = ?, Email = ?, Picture = ?, UniversityID_u = IFNULL((SELECT UniversityID FROM Prospectus.University WHERE emailDomain = ?), 2)';
  connection.query(query, [sub, name, email, picture, hd], (err, data) => {
    if (err) res.sendStatus(500);
    // 6 hours
    const token = jwt.sign({ id: sub }, process.env.TOKEN_SECRET, { expiresIn: '21600s' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
    });
    res.json(token);
  });
});

// route for returning search results
app.get('/search', (req, res) => {
  const sql = queries.Search;
  const { dept, keywords, userid } = req.query;

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
app.get('/user/wishlist', authUser, (req, res) => {
  const sql = queries.wishlistQuery;
  const { keywords } = req.query;

  connection.query(sql, [req.user, keywords], (err, data) => {
    if (err) throw err;
    res.json({
      status: 200,
      length: Object.keys(data).length,
      data,
      message: "User's wishlist returned successfully",
    });
  });
});

// route for adding entry to a user's wishlist
app.post('/user/wishlist', authUser, (req, res) => {
  const sql = queries.wishlistInsert;
  const { courseid } = req.body;

  // we probably need to validate the university ID here? for searching
  connection.query(sql, [req.user, courseid, courseid], (err, data) => {
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

// route for updating entry in a user's wishlist
app.post('/user/wishlist/update', authUser, (req, res) => {
  const sql = queries.wishlistUpdate;
  const { userid, courseid, desc } = req.body;

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

// route for deleting entry from a user's wishlist
app.delete('/user/wishlist', (req, res) => {
  const sql = queries.wishlistDelete;
  const { userid, courseid } = req.query;

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
  const { userid } = req.query;

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

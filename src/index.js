/* eslint-disable no-console */

require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const client = new OAuth2Client(process.env.CLIENT_ID);
const connection = require('./db');

const queries = require('./queries');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(express.static(path.join(__dirname, '../frontend/build')));

// https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
// eslint-disable-next-line consistent-return
function authUser(req, res, next) {
  const { token } = req.cookies;
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
    if (err || !data.id) return res.sendStatus(403);

    req.user = data.id;

    next();
  });
}

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

app.get('/unisearch', (req, res) => {
  const {UniversityID} = req.query;
  const sqlSearch = "SELECT * FROM University WHERE UniversityID = ?";
  connection.query(sqlSearch,[UniversityID], (error, result) => {
    if (error) throw error;
      res.json(result);
  });
});

app.get('/user/profile', authUser, (req, res) => {

  console.log("hi");
  connection.query('SELECT * From Users WHERE UserId = ?', [req.user], (err, data) => {
    if (err) throw err;

    res.json(data);
  });
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

app.put("/updateUser", (req, res) => {
  const Email = req.body.Email;
  const Major = req.body.Major;
  const Name = req.body.Name;
  const Picture = req.body.Picture;
  const YearEnrolled = req.body.YearEnrolled;
  const UserId = req.body.UserId;

  // console.log(Email)
  // console.log(Major)
  // console.log(Name)
  // console.log(Picture)
  // console.log(YearEnrolled)
  // console.log(UserId)


  const sqlUpdate = "UPDATE `Users` SET `Email` = ?,`Major` = ?, `Name` = ?, `Picture` = ?, `YearEnrolled` = ? WHERE `UserId` = ?;";
  
  connection.query(sqlUpdate, [Email, Major,Name,Picture,YearEnrolled,UserId], (error, result) => {
      if (error) 
      console.log(error);
  })
});

app.put("/updateUniversity", (req, res) => {
  const UniCity = req.body.UniCity;
  const PrimeColor = req.body.PrimeColor;
  const SecondColor = req.body.SecondColor;
  const EmailDomain = req.body.EmailDomain;
  const UniversityID = req.body.UniversityID;
  const UniName = req.body.UniName

  console.log(UniCity)
  console.log(PrimeColor)
  console.log(SecondColor)
  console.log(EmailDomain)
  console.log(UniversityID)
  console.log(UniName)

  const sqlUpdate = "UPDATE `University` SET `City` = ?,`PrimaryColor` = ?, `SecondaryColor` = ?, `UniversityName` = ?, `emailDomain` = ? WHERE `UniversityID` = ?;";
  
  connection.query(sqlUpdate, [UniCity, PrimeColor,SecondColor,UniName,EmailDomain,UniversityID], (error, result) => {
      if (error) 
      console.log(error);
  })
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

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

process.on('SIGINT', () => {
  connection.destroy();
  process.exit(0);
});

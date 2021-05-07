/* eslint-disable no-console */

require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const client = new OAuth2Client(process.env.CLIENT_ID);
const { assert } = require('console');
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
    return null;
  });
}

app.post('/login', async (req, res) => {
  const { idToken } = req.body;
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.CLIENT_ID,
  });

  const {
    hd, email, name, picture, sub, aud,
  } = ticket.getPayload();
  if (aud !== process.env.CLIENT_ID) {
    res.sendStatus(400);
  }
  
  const query = 'INSERT IGNORE INTO Prospectus.Users SET UserId = ?, Name = ?, Email = ?, Picture = ?, UniversityID_u = IFNULL((SELECT UniversityID FROM Prospectus.University WHERE emailDomain = ?), 2)';
  connection.query(query, [sub, name, email, picture, hd], (err) => {
    if (err) res.sendStatus(500);
    // 6 hours
    const token = jwt.sign({ id: sub }, process.env.TOKEN_SECRET, {
      expiresIn: '21600s',
    });
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
    });
    res.json(token);
  });
});

// route for returning search results
app.get('/search', authUser, (req, res) => {
  const sql = queries.Searchv2;
  const { q } = req.query;
  connection.query(
    sql,
    [q, req.user, q, req.user, q, req.user],
    (err, data) => {
      if (err) throw err;
      res.json(data);
    },
  );
});

app.get('/user/profile', authUser, (req, res) => {
  connection.query(
    'SELECT * From Users WHERE UserId = ?',
    [req.user],
    (err, data) => {
      if (err) throw err;

      res.json(data);
    },
  );
});

app.get('/unisearch', (req, res) => {
  const { UniversityID } = req.query;
  const sqlSearch = 'SELECT * FROM University WHERE UniversityID = ?';
  connection.query(sqlSearch, [UniversityID], (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});

app.get('/user/profile', authUser, (req, res) => {
  connection.query(
    'SELECT * From Users WHERE UserId = ?',
    [req.user],
    (err, data) => {
      if (err) throw err;

      res.json(data);
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

app.put('/updateUser', (req, res) => {
  const { Major } = req.body;
  const { Name } = req.body;
  const { Picture } = req.body;
  const { YearEnrolled } = req.body;
  const { UserId } = req.body;

  const sqlUpdate = 'UPDATE `Users` SET `Major` = ?, `Name` = ?, `Picture` = ?, `YearEnrolled` = ? WHERE `UserId` = ?;';

  connection.query(
    sqlUpdate,
    [Major, Name, Picture, YearEnrolled, UserId],
    (error) => {
      if (error) console.log(error);
      res.sendStatus(200);
    },
  );
});

app.put('/updateUniversity', (req, res) => {
  const { UniCity } = req.body;
  const { PrimeColor } = req.body;
  const { SecondColor } = req.body;
  const { EmailDomain } = req.body;
  const { UniversityID } = req.body;
  const { UniName } = req.body;

  const sqlUpdate = 'UPDATE `University` SET `City` = ?,`PrimaryColor` = ?, `SecondaryColor` = ?, `UniversityName` = ?, `emailDomain` = ? WHERE `UniversityID` = ?;';

  connection.query(
    sqlUpdate,
    [UniCity, PrimeColor, SecondColor, UniName, EmailDomain, UniversityID],
    (error) => {
      if (error) console.log(error);
      res.sendStatus(200);
    },
  );
});

// route for updating entry in a user's wishlist
app.post('/user/wishlist/update', authUser, (req, res) => {
  const sql = queries.wishlistUpdate;
  const { courseid, desc } = req.body;

  connection.query(sql, [desc, courseid, req.user], (err, data) => {
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
app.delete('/user/wishlist', authUser, (req, res) => {
  const sql = queries.wishlistDelete;
  const { courseid } = req.query;

  connection.query(sql, [req.user, courseid], (err, data) => {
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
app.get('/user/coursesTaken', authUser, (req, res) => {
  const sql = queries.coursesTakenQuery;

  connection.query(sql, [req.user], (err, data) => {
    if (err) throw err;
    res.json({
      status: 200,
      length: Object.keys(data).length,
      data,
      message: 'Courses taken returned successfully',
    });
  });
});

// route for querying all courses relevant to a user
app.get('/user/relevantcourses', authUser, (req, res) => {
  const sql = queries.relevantCoursesQuery;

  // We select index 1 because 0 is the stored procedure, can't really supress
  connection.query(sql, [req.user], (err, data) => {
    if (err) throw err;
    res.json({
      status: 200,
      length: Object.keys(data[1]).length,
      data: data[1],
      message: "User's relevant courses returned successfully",
    });
  });
});

// route for querying description of a course
app.get('/user/coursedescription', (req, res) => {
  const sql = queries.courseDescQuery;
  const { courseid } = req.query;

  connection.query(sql, [courseid], (err, data) => {
    if (err) throw err;
    res.json({
      status: 200,
      length: Object.keys(data).length,
      data,
      message: 'Course description returned successfully',
    });
  });
});

// route for adding entry to a user's taken courses list
app.post('/user/coursesTaken', authUser, (req, res) => {
  const sql = queries.coursesTakenInsert;
  const { courseid } = req.body;

  connection.query(sql, [req.user, courseid], (err, data) => {
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
        message: "Course added to user's taken courses list successfully",
      });
    }
  });
});

// route for querying all courses that a user has taken
app.get('/user/coursesPlanner', authUser, (req, res) => {
  const sql = queries.coursesPlannerQuery;
  const { semester } = req.query;

  connection.query(sql, [req.user, semester], (err, data) => {
    if (err) throw err;
    res.json({
      status: 200,
      length: Object.keys(data).length,
      data,
      message: 'Courses planner returned successfully',
    });
  });
});

// route for adding entry to a user's courses planner list
app.post('/user/coursesPlanner', authUser, (req, res) => {
  const sql = queries.coursesPlannerInsert;
  const { courseid, semester } = req.body;

  connection.query(sql, [req.user, courseid, semester], (err, data) => {
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
        message: "Course added to user's taken courses planner successfully",
      });
    }
  });
});

// route for deleting entry from a user's wishlist
app.delete('/user/coursesPlanner', authUser, (req, res) => {
  const sql = queries.coursesPlannerDelete;
  const { courseid, semester } = req.query;

  connection.query(sql, [req.user, courseid, semester], (err, data) => {
    if (err) throw err;
    res.json({
      status: 200,
      length: Object.keys(data).length,
      data,
      message: "Course deleted from user's courses planner successfully",
    });
  });
});

// DFS traveral where far left last node controls when we send the whole edge graph
// Kinda a mess with callbacks & recursion lol
function dfsHelp(
  courseId,
  depth,
  targetDepth = 1,
  relationship,
  edges,
  seen,
  res = null,
  last = true,
) {
  if (depth >= targetDepth) {
    if (last && res) res.json({ edges, seen });
    return;
  }
  connection.query(
    'SELECT RelatedCourseID from CoursesRelationships WHERE CourseID_cr = ? AND Relationship = ?',
    [courseId, relationship],
    (err, data) => {
      if (err) throw err;
      data.forEach(({ RelatedCourseID }, i) => {
        // eslint-disable-next-line
        seen[relationship][RelatedCourseID] = true;
        edges.push(
          relationship
            ? {
              from: RelatedCourseID,
              to: courseId,
            }
            : {
              from: courseId,
              to: RelatedCourseID,
            },
        );
        dfsHelp(
          RelatedCourseID,
          depth + 1,
          targetDepth,
          relationship,
          edges,
          seen,
          res,
          last && i === data.length - 1,
        );
      });
      if (last && data.length === 0 && res) {
        res.json({ edges, seen });
      }
    },
  );
}

app.get('/relational/:courseId', (req, res) => {
  const { courseId } = req.params;
  const { depth } = req.query;
  if (depth > 2) res.sendStatus(403);
  const edges = [];
  const seen = { 0: {}, 1: {} };
  dfsHelp(courseId, 0, depth, 0, edges, seen);
  dfsHelp(courseId, 0, depth, 1, edges, seen, res);
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

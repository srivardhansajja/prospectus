/* eslint-disable no-console */

require("dotenv").config();
const express = require("express");
const connection = require("./db");
const cors = require("cors");
const { response } = require("express");

const queries = require("./queries.js");

const app = express();
const port = 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Home route reached!");
});

app.get("/search", (req, res) => {
  let sql = queries.searchQuery(
    req.query.dept,
    req.query.keywords,
    req.query.userid
  );
  console.log(req.query);
  connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      length: Object.keys(data).length,
      data,
      message: "Search results returned successfully",
    });
  });
});

app.get("/user/coursesTaken", (req, res) => {
  let sql = queries.coursesTakenQuery(req.query.userid);
  console.log(req.query);
  connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      length: Object.keys(data).length,
      data,
      message: "Courses taken returned successfully",
    });
  });
});

app.get("/user/wishlist", (req, res) => {
  let sql = queries.wishlistQuery(req.query.userid);
  console.log(req.query);
  connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      length: Object.keys(data).length,
      data,
      message: "Courses taken returned successfully",
    });
  });
});

app.get("/:param", (req, res) => {
  res.send(`Hello World, ${req.params.param}`);
});

// app.get("/:param", (req, res) => {
//   res.send(`Hello World, ${req.params.param}`);
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

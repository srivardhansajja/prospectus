const mysql = require('mysql2');
// https://austinhale.medium.com/building-a-node-api-with-express-and-google-cloud-sql-9bda260b040f
// https://github.com/sidorares/node-mysql2
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) {
    // console.error(`Error connecting: ${err.stack}`);
    // return;
  }
  // console.log(`Connected to DB as thread id: ${connection.threadId}`);
});

module.exports = connection;

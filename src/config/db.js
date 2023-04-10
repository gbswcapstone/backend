const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "Uistagram",
  port: "3306",
  dateStrings: "date",
});

db.connect();

module.exports = db;

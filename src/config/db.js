const mysql = require("mysql");

const db = mysql.createConnection({
  host: "nodejs-014.cafe24.com",
  user: "wjdgotjd529",
  password: "Baby1018",
  database: "wjdgotjd529",
  port: "3306",
  dateStrings: "date",
});

db.connect();

module.exports = db;

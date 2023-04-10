const mysql = require("mysql");

const db = mysql.createConnection({
  host: "http://cometj.cafe24app.com/",
  user: "wjdgotjd529",
  password: "Baby1018",
  database: "wjdgotjd529",
  port: "3306",
  dateStrings: "date",
});

db.connect();

module.exports = db;

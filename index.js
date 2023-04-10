const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const home = require("./src/routes/home");
const MySQLStore = require("express-mysql-session")(session);

app.set("views", __dirname + "/src/views");
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/src/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*",
};

const mysqlOptions = {
  host: "localhost",
  user: "root",
  password: "1234",
  database: "Uistagram",
  port: "3306",
};

const sessionStore = new MySQLStore(mysqlOptions);

app.use(
  session({
    secret: "Uistagram2023",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    },
    store: sessionStore,
  })
);

app.use(cors(corsOptions));

app.use("/", home);

module.exports = app;

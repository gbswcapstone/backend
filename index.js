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
  origin: ["https://uistagram.gbsw.hs.kr"],
};

const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PSWORD,
  database: process.env.DB_DATABASE,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    },
    store: sessionStore,
    name: "session_id",
  })
);

app.use(cors(corsOptions));

app.use("/", home);

module.exports = app;

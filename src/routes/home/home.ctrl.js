const User = require("../../models/User");
const Festival = require("../../models/Festival");
const Restaurant = require("../../models/Restaurant");
const Course = require("../../models/Course");

const output = {
  home: (req, res) => {
    const userAgent = req.headers["user-agent"];

    if (userAgent.includes("Mobile")) {
      res.render("mobile/index");
    } else {
      res.render("pc/index");
    }
  },

  course: (req, res) => {
    const userAgent = req.headers["user-agent"];

    if (userAgent.includes("Mobile")) {
      res.redirect("/");
    } else {
      res.render("pc/course");
    }
  },

  login: (req, res) => {
    const userAgent = req.headers["user-agent"];

    if (userAgent.includes("Mobile")) {
      res.redirect("/");
    } else {
      res.render("pc/login");
    }
  },

  register: (req, res) => {
    const userAgent = req.headers["user-agent"];

    if (userAgent.includes("Mobile")) {
      res.redirect("/");
    } else {
      res.render("pc/register");
    }
  },

  getFestival: async (req, res) => {
    const festival = new Festival();
    const response = await festival.get();

    return res.json(response);
  },

  getRestaurants: async (req, res) => {
    const restaurant = new Restaurant();
    const response = await restaurant.get();

    return res.json(response);
  },

  getCourses: async (req, res) => {
    const course = new Course();
    const response = await course.get();

    return res.json(response);
  },

  getSteps: async (req, res) => {
    const course = new Course(req);
    const response = await course.getSteps();

    return res.json(response);
  },
};

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();
    if (response.success) {
      req.session.user_name = response.name;
      req.session.user_id = response.id;
      req.session.isAdmin = response.isAdmin;
    }
    return res.json(response);
  },

  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register();
    return res.json(response);
  },
};

module.exports = {
  output,
  process,
};

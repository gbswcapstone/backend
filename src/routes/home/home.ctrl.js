const User = require("../../models/User");
const Board = require("../../models/Board");

const output = {
  home: (req, res) => {
    res.render("home/index");
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

  getBoard: async (req, res) => {
    const board = new Board();
    const response = await board.getBoard();
    return res.json(response);
  },
};

module.exports = {
  output,
  process,
};

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.home);
router.get("/.well-known/pki-validation/:a", (req, res) => {
  res.sendFile(
    "C:/Users/User/Desktop/GBSW/capstone/D62111A0205B5C576F0FE89490131FFD.txt"
  );
});

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);
router.post("/getBoard", ctrl.process.getBoard);

module.exports = router;

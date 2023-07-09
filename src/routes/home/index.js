const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.home);
router.get("/course", ctrl.output.course);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);
router.get("/api/festivals", ctrl.output.getFestival);
router.get("/api/restaurants", ctrl.output.getRestaurants);
router.get("/api/courses", ctrl.output.getCourses);
router.get("/api/courses/:idx", ctrl.output.getSteps);

router.post("/api/login", ctrl.process.login);
router.post("/api/register", ctrl.process.register);

module.exports = router;

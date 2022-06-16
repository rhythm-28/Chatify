const express = require("express");
const router = express.Router();

const registerUser = require("../controllers/users/registerUser");
const loginUser = require("../controllers/users/loginUser");
const protect = require("../middlewares/authMiddleware");
const allUser = require("../controllers/users/allUser");

router.route("/").get(protect, allUser);
router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router;

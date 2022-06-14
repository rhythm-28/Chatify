const express = require('express');
const router = express.Router();

const registerUser = require("../controllers/registerUser");
const loginUser = require("../controllers/loginUser");

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router;
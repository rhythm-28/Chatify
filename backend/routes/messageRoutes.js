const express = require("express");
const router = express.Router();

// to make sure only logged in users can access these routes
const protect = require("../middlewares/authMiddleware");

const sendMessage = require("../controllers/messages/sendMessage");
const allMessages = require("../controllers/messages/allMessages");

// send a message
router.route("/").post(protect,sendMessage);

// find all messages of a particular chat using chat id
router.route("/:chatId").get(protect, allMessages);

module.exports = router;
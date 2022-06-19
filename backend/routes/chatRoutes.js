const express = require("express");
const router = express.Router();

// to make sure only logged in users can access these routes
const protect = require("../middlewares/authMiddleware");

const accessChat = require("../controllers/chats/accessChat");
const allChats = require("../controllers/chats/allChats");
const createGroup = require("../controllers/chats/createGroup");
const renameGroup = require("../controllers/chats/renameGroup");
const addToGroup = require("../controllers/chats/addToGroup");
const removeFromGroup = require("../controllers/chats/removeFromGroup");

// access the chat with given user
// if chat doesn't exist, create it
router.route("/accessChat").post(protect,accessChat);

// returns all those chats where logged in user is present
router.route("/allChats").get(protect,allChats);

// creates a group with >2 people
router.route("/createGroup").post(protect, createGroup);

// renames group
router.route("/renameGroup").put(protect, renameGroup);

// add user to group
router.route("/addToGroup").put(protect, addToGroup);

// remove user from group
router.route("/removeFromGroup").put(protect, removeFromGroup);

module.exports = router;
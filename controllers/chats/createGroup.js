const asyncHandler = require("express-async-handler");
const User = require("../../models/user.js");
const Chat = require("../../models/chat.js");

const createGroup = asyncHandler(async function (req, res) {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  var users = JSON.parse(req.body.users);

  // pushing logged in user as well
  users.push(req.user);

  if (users.length <= 2) {
    return res.status(400).json({
      status: 400,
      message: "More than 2 users are required to form a group chat",
    });
  }

  try {
    // creating group
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    // poulating the above created group with data
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = createGroup;

const asyncHandler = require("express-async-handler");

const User = require("../../models/user.js");
const Chat = require("../../models/chat.js");

// returns all those chats where logged in user is present
const allChats = asyncHandler(async function (req, res) {
  try {
    // find those chats where logged in user is a part
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })

      // populate all fields
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")

      // sorting chats from new to old
      .sort({ updatedAt: -1 })

      // populating sender details of latest message in found chat with data from User model
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = allChats;

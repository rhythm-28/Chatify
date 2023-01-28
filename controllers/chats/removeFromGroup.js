const asyncHandler = require("express-async-handler");
const User = require("../../models/user.js");
const Chat = require("../../models/chat.js");

const removeFromGroup = asyncHandler(async function (req, res) {
  const { chatId, userId } = req.body;

  if (!req.body.chatId || !req.body.userId) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});

module.exports = removeFromGroup;

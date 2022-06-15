const asyncHandler = require("express-async-handler");
const User = require("../../models/user.js");
const Chat = require("../../models/chat.js");

const renameGroup = asyncHandler(async function (req, res) {
  const { chatId, chatName } = req.body;
  if (!req.body.chatId || !req.body.chatName) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  // find by given chatId and updated name with given name
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});

module.exports = renameGroup;

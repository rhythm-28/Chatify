const asyncHandler = require("express-async-handler");
const User = require("../../models/user.js");
const Chat = require("../../models/chat.js");

// return the chat with given user
// if chat doesn't exist, create it and then return it
const accessChat = asyncHandler(async function (req, res) {

  // this is id of user with whom we want to access chat
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  // checking if such a chat exists which has both the logged in user and given user
  // and which is not a group chat
  var isChat = await Chat.find({
    isGroupChat: false,
    // both conditions must be true
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    // populating the found chat with user data (but not password) and latest message
    .populate("users", "-password")
    .populate("latestMessage");

  // populating sender details of latest message in found chat with data from User model
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  // if chat was found
  // means it was already created
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    // chat was not found
    // so here, we will create it

    // creating chat info
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      // create chat in database
      const createdChat = await Chat.create(chatData);
      // find and populate it with user data (but not password) and latest message
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      // updating sender details for latest message was not required here as chat is created just now

      res.status(200).json(FullChat);
    } catch (error) {
      // if chat creation caused error
      res.status(400);
      throw new Error(error.message);
    }
  }
});

module.exports = accessChat;

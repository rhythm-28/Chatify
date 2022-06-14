const asyncHandler = require("express-async-handler");
const User = require("../../models/user.js");
const generateToken = require("../../config/token");
const registerUser = asyncHandler(async (req, res) => {

  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({
      status: 400,
      message: "Enter all required fields",
    });
    throw new Error("Enter all required fields");
  }
  const doesUserExist = await User.findOne({ email });
  if (doesUserExist) {
    res.status(400).json({
      status: 400,
      message: "User already Exists",
    });
    throw new Error("User already Exists");
  }
  const newUser = await User.create({ name, email, password, pic });
  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      pic: newUser.pic,
      token: generateToken(newUser.id)
    });
  } else {
    res.status(400).json({
      status: 400,
      message: "Failed to create new user",
    });
    throw new Error("Failed to create new user");
  }
});

module.exports = registerUser;

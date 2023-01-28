const asyncHandler = require("express-async-handler");
const User = require("../../models/user.js");
const generateToken = require("../../config/token");

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      status: 400,
      message: "Enter all required fields",
    });
    throw new Error("Enter all required fields");
  }
  const user = await User.findOne({ email });

  // first checks if user exists and then checks if password matches
  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user.id),
    });
  } else {
    res.status(400).json({
      status: 400,
      message: "Invalid email-id or password",
    });
    throw new Error("Invalid email-id or password");
  }
});

module.exports = loginUser;

const asyncHandler = require("express-async-handler");
const User = require("../../models/user.js");

const allUser = asyncHandler(async (req, res) => {

  // api/user?search=rhythm
  // takes query from URL
  const { search } = req.query;

  // searches in database for the input keyword (search)
  // or means if either of given conditions return true, it will return true
  // regex is used for searching strings in MongoDB
  // i means case insensitive
  const keyword = search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});
module.exports = allUser;

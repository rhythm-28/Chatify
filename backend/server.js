const express = require("express");
const doetenv = require("dotenv");
const bodyParser = require("body-parser");
const connectToDB = require("./config/db");
//const chats = require("./data/data.js");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const {notFound,errorHandler} = require("./middlewares/middlewares.js")
const app = express();
doetenv.config();

connectToDB();

app.use(bodyParser.json());

app.use("/api/user", userRoutes);
app.use("/api/chat",chatRoutes);
app.use("/api/message", messageRoutes);
// app.get("/", (req, res) => {
//   res.send("Home page of back-end server is working fine");
// });

// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });

// app.get("/api/chat/:id", (req, res) => {
//   const desiredChatId = req.params.id;
//   const desiredChat = chats.find((chat) => chat._id == desiredChatId);
//   res.send(desiredChat);
// });

app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Back-end Server is running at port " + PORT);
});

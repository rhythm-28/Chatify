const mongoose = require("mongoose");

async function connectToDB() {
  try {
    const dbConnection = mongoose.connect(process.env.MONGO_URI);
    console.log("Backend connected to database successfully" + dbConnection);
  } catch (error) {
    consolve.log("Backend connected to database failed. Error: " + error);
  }
}

module.exports = connectToDB;

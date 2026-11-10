const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      console.error(
        "CRITICAL ERROR: MONGO_URL environment variable is NOT defined!".bgRed.white
      );
      return;
    }
    await mongoose.connect(mongoUrl);
    console.log(
      `Connected To Mongodb Database ${mongoose.connection.host}`.bgMagenta
        .white
    );
  } catch (error) {
    console.log(`Mongodb Database Error ${error}`.bgRed.white);
  }
};

module.exports = connectDB;

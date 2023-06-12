require('dotenv').config();
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log(`connected successfully ${conn.connection.host}`);
  } catch (error) {
    console.log(`error ${error.message}`);
    process.exit();
  }
};
module.exports = connectDB;

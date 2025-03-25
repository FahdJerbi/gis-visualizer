const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then((res) => {
      console.log("db is connected successfully ");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;

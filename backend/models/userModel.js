const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: [true, "This email is used by another user !"],
    },
    password: {
      // add regex as validator
      type: String,
      required: true,
      minLength: 8,
    },
    username: {
      type: String,
      required: true,
      unique: [true, "This name is used by another user !"],
    },
    createdAt: {
      type: Date,
      default: Date.now, // explain
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

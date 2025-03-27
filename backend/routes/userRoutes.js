const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel.js");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      throw new Error("Please provide the neccessary informations !");
    }

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "This email is already in use !" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();

    // add verification and welcoming email

    res
      .status(200)
      .json({ status: true, message: "User account created successfully !" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, message: error });
  }
});

router.get("/login", async (req, res) => {
  res.status(200).send("login route");
});

module.exports = router;

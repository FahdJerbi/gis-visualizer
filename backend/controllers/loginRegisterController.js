const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      res.status(400).json({
        status: false,
        message: "Please Provide All Credentials",
      });
      return;
    }

    const emailFound = await User.findOne({ where: { email } });
    if (emailFound) {
      res.status(400).json({
        status: false,
        message: "This Email is already exist, try another one !",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      status: true,
      message: "Account created successfully",
      data: newUser,
    });
  } catch (error) {
    console.log("Cannot Create Account Error:", error);
    res.status(500).json({
      status: false,
      message: "Something wrong with the server",
    });
  }
};

const userLogin = (req, res) => {
  res.send("login route");
};

module.exports = { userRegister, userLogin };

const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      message: "Something wrong with the register service",
    });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await User.findOne({ where: { email } });

    if (!findUser) {
      return res.status(400).json({
        status: false,
        message: "Invalid Credentials",
      });
    }

    const verifyPassword = await bcrypt.compare(
      password,
      findUser.password.trim()
    );

    if (!verifyPassword) {
      return res.status(400).json({
        status: false,
        message: "Invalid Credentials",
      });
    }

    const userToken = await jwt.sign(
      { UserId: findUser.id },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      status: true,
      message: "You are logged in, welcome back !",
      token: userToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Something wrong with the login service",
    });
  }
};

module.exports = { userRegister, userLogin };

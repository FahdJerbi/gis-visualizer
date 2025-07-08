const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const loginRegisterRouter = require("./routes/loginRegisterRoutes");
require("dotenv").config();

// middlewares
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("test route !");
});

app.use("/api/user", userRouter);
app.use("/api/user/auth", loginRegisterRouter);

// listen to server
app.listen(process.env.PORT, () => {
  try {
    console.log(`Server is running...`);
  } catch (error) {
    console.log(error);
  }
});

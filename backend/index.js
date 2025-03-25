const express = require("express");
const app = express();
const connectDB = require("./db/connect.js");

// auth routes
// app.use("/api/auth", userRoutes);

app.get("/", async (req, res) => {
  res.status(200).send("first route");
});

app.listen(5000, async () => {
  await connectDB();
  console.log("server is running on port 5000");
});

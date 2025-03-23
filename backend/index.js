const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes.js");

// auth routes
app.use("/api/auth", userRoutes);

app.listen(5000, () => {
  console.log("server is running on port 5000");
});

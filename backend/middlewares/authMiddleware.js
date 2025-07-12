const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers["authorization"];

  if (!token) {
    return res.status(400).json({
      status: false,
      message: "Access Denied",
    });
  }

  try {
    const verifyToken = await jwt.verify(token, process.env.SECRET_KEY);

    console.log(verifyToken);

    req.userId = verifyToken.userId;

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: "Something wrong with auth",
    });
  }
};

module.exports = authMiddleware;

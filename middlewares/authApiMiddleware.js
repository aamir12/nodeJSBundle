const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const db = require("../config/db");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    try {
      token = req.headers.authorization;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { usersId } = decoded;
      const query = "SELECT id FROM users where  id = ? limit 1";
      const check_user = await dbexe(query, [usersId]);
      if (check_user.length !== 0) {
        next();
      } else {
        return res
          .status(405)
          .json({ status: false, message: "Invalid login details" });
      }
    } catch (error) {
      return res.status(405).json({
        status: false,
        message: "User is not authorized",
      });
    }
  } else {
    return res.status(405).json({
      status: false,
      message: "User is not authorized and token not found",
    });
  }
});

module.exports = { protect };

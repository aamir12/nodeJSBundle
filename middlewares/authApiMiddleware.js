const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { dbexe, dbGet } = require("../utils/dbHelper");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    try {
      token = req.headers.authorization;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { userId } = decoded;
      const query = "SELECT id FROM users where  id = ? limit 1";
      const check_user = await dbexe(query, [userId], "single");
      if (check_user) {
        req.userId = check_user.id;
        next();
      } else {
        return res
          .status(405)
          .json({ status: false, message: "Unauthorized Access" });
      }
    } catch (error) {
      return res.status(405).json({
        status: false,
        message: "Session Expired",
      });
    }
  } else {
    return res.status(405).json({
      status: false,
      message: "Unauthorized Access",
    });
  }
});

module.exports = { protect };

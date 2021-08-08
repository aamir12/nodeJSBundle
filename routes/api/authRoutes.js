const express = require("express");
const router = express.Router();
const authCtr = require("../../controllers/api/authCtrl.js");
const { protect } = require("../../middlewares/authApiMiddleware.js");

router.post("/login", authCtr.login);
router.get("/profile", protect, authCtr.getUserProfile);
module.exports = router;

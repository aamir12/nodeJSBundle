const express = require("express");
const router = express.Router();
const userCtr = require("../../controllers/api/authCtrl.js");
const middleware = require("../../middlewares/authApiMiddleware.js");

router.post("/login", userCtr.authUser);
router.get("/profile", middleware.protect, userCtr.getUserProfile);
router.get("/qrCode", middleware.protect, userCtr.getQRCode);

module.exports = router;

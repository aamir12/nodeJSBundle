const express = require("express");
const router = express.Router();
const postCtrl = require("../../controllers/api/postCtrl.js");
const { protect } = require("../../middlewares/authApiMiddleware.js");

router.get("/", postCtrl.allPost);
router.get("/:id", postCtrl.getPost);
router.post("/add", protect, postCtrl.addPost);
router.post("/update", protect, postCtrl.updatePost);
router.post("/delete/:id", protect, postCtrl.deletePost);

module.exports = router;

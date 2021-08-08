const asyncHandler = require("express-async-handler");
var validator = require("validator");
const postMdl = require("../../models/api/postMdl");

exports.addPost = asyncHandler(async (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  if (!title || validator.isEmpty(title) || !body || validator.isEmpty(body)) {
    return res.status(403).json({
      status: false,
      message: "Please enter valid  inputs",
    });
  }

  const date = new Date();
  const data = {
    title: title,
    body: body,
    user_id: req.userId,
    createdAt: date,
    updatedAt: date,
  };
  const result = await postMdl.addPost(data);
  if (result) {
    return res
      .status(200)
      .json({ status: true, message: "Post insert successfully" });
  } else {
    return res
      .status(403)
      .json({ status: false, message: "Something went wrong" });
  }
});

exports.updatePost = asyncHandler(async (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const id = req.body.id;
  if (
    !title ||
    validator.isEmpty(title) ||
    !body ||
    validator.isEmpty(body) ||
    !id ||
    validator.isEmpty(id)
  ) {
    return res.status(403).json({
      status: false,
      message: "Please enter valid  inputs",
    });
  }

  const date = new Date();
  const data = {
    title: title,
    body: body,
    updatedAt: date,
  };
  const conditions = {
    id: id,
    user_id: req.userId,
  };
  const result = await postMdl.updatePost(data, conditions);
  if (result === "success") {
    return res
      .status(200)
      .json({ status: true, message: "Post insert successfully" });
  } else if (result === "notFound") {
    return res.status(403).json({ status: false, message: "Post not found" });
  } else if (result === "error") {
    return res
      .status(403)
      .json({ status: false, message: "Something went wrong" });
  }
});

exports.deletePost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id || validator.isEmpty(id)) {
    return res.status(403).json({
      status: false,
      message: "Please enter valid  inputs",
    });
  }

  const conditions = {
    id: id,
    user_id: req.userId,
  };
  const result = await postMdl.deletePost(conditions);
  if (result === "success") {
    return res
      .status(200)
      .json({ status: true, message: "Post delete successfully" });
  } else if (result === "notFound") {
    return res.status(403).json({ status: false, message: "Post not found" });
  } else if (result === "error") {
    return res
      .status(403)
      .json({ status: false, message: "Something went wrong" });
  }
});

exports.allPost = asyncHandler(async (req, res) => {
  const result = await postMdl.allPost();
  if (result) {
    return res.status(200).json({
      status: true,
      message: "Get post list successfully",
      data: result,
    });
  } else {
    return res.status(403).json({
      status: false,
      message: "Something went wrong",
    });
  }
});

exports.getPost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id || validator.isEmpty(id)) {
    return res.status(403).json({
      status: false,
      message: "Please enter valid  inputs",
    });
  }
  const result = await postMdl.getPost({ id });
  if (result) {
    return res.status(200).json({
      status: true,
      message: "Post get successfully",
      data: result,
    });
  } else {
    return res.status(403).json({
      status: false,
      message: "Post not found",
    });
  }
});

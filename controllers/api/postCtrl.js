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
  const response = await postMdl.addPost(data);
  if (response.status) {
    return res.status(200).json(response);
  } else {
    return res.status(403).json(response);
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
  const response = await postMdl.updatePost(data, conditions);
  if (response.status) {
    return res.status(200).json(response);
  } else {
    return res.status(403).json(response);
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
  const response = await postMdl.deletePost(conditions);
  if (response.status) {
    return res.status(200).json(response);
  } else {
    return res.status(403).json(response);
  }
});

exports.allPost = asyncHandler(async (req, res) => {
  const response = await postMdl.allPost();
  if (response.status) {
    return res.status(200).json(response);
  } else {
    return res.status(403).json(response);
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
  const response = await postMdl.getPost({ id });
  if (response.status) {
    return res.status(200).json(response);
  } else {
    return res.status(403).json(response);
  }
});

const asyncHandler = require("express-async-handler");
var validator = require("validator");
const authMdl = require("../../models/api/authMdl");

exports.login = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (
    !email ||
    validator.isEmpty(email) ||
    !validator.isEmail(email) ||
    !password ||
    validator.isEmpty(password)
  ) {
    return res.status(403).json({
      status: false,
      message: "Please enter valid  inputs",
    });
  }

  const data = {
    email: email,
    password: password,
  };
  const response = await authMdl.login(data);
  if (response.status) {
    return res.status(200).json(response);
  } else {
    return res.status(403).json(response);
  }
});

exports.getUserProfile = asyncHandler(async (req, res) => {
  const response = await authMdl.userProfile(req.userId);
  if (response.status) {
    return res.status(200).json(response);
  } else {
    return res.status(404).json(response);
  }
});

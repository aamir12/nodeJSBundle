const {
  uuid: uniqueId,
  compareAsync,
  generateToken,
} = require("../../utils/authHelper");
const { dbInsert, dbGet, dbUpdate, dbDelete } = require("../../utils/dbHelper");
exports.addPost = async (data) => {
  let response = {
    status: false,
    message: "Something went wrong",
  };
  const check = await dbInsert("posts", data);
  if (check) {
    response["status"] = true;
    response["message"] = "Data insert successfully";
  }
  return response;
};

exports.updatePost = async (data, conditions) => {
  let response = {
    status: false,
    message: "Something went wrong",
  };
  const isExist = await dbGet("posts", conditions, [], "single");
  if (!isExist) {
    response["status"] = false;
    response["message"] = "Record not found";
    return response;
  }
  const check = await dbUpdate("posts", data, conditions);
  if (check) {
    response["status"] = true;
    response["message"] = "Data update successfully";
  }
  return response;
};

exports.deletePost = async (conditions) => {
  let response = {
    status: false,
    message: "Something went wrong",
  };
  const isExist = await dbGet("posts", conditions, [], "single");
  if (!isExist) {
    response["status"] = false;
    response["message"] = "Record not found";
    return response;
  }
  const check = await dbDelete("posts", conditions);
  if (check) {
    response["status"] = true;
    response["message"] = "Data delete successfully";
  }
  return response;
};

exports.allPost = async () => {
  let response = {
    status: false,
    message: "Something went wrong",
  };
  const check = await dbGet("posts");
  if (check) {
    response["status"] = true;
    response["message"] = "Get data list successfully";
    response["data"] = check;
  }
  return response;
};

exports.getPost = async (conditions) => {
  let response = {
    status: false,
    message: "Post not found",
  };
  const check = await dbGet("posts", conditions, [], "single");
  if (check) {
    response["status"] = true;
    response["message"] = "Get data successfully";
    response["data"] = check;
  }
  return response;
};

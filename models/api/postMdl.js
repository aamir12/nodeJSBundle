const { options } = require("../../routes/api/authRoutes");
const {
  uuid: uniqueId,
  compareAsync,
  generateToken,
} = require("../../utils/authHelper");
const { dbInsert, dbGet, dbUpdate, dbDelete } = require("../../utils/dbHelper");

exports.addPost = async (data) => {
  const check = await dbInsert("posts", data);
  return check;
};

exports.updatePost = async (data, conditions) => {
  const isExist = await dbGet("posts", { conditions }, "single");
  if (!isExist) {
    return "notFound";
  }
  const check = await dbUpdate("posts", data, { conditions });
  if (check) {
    return "success";
  }
  return "error";
};

exports.deletePost = async (conditions) => {
  const isExist = await dbGet("posts", { conditions }, "single");
  if (!isExist) {
    return "notFound";
  }
  const check = await dbDelete("posts", { conditions });
  if (check) {
    return "success";
  }
  return "error";
};

exports.allPost = async () => {
  let response = false;
  const check = await dbGet("posts");
  if (check) {
    response = check;
  }
  return response;
};

exports.getPost = async (conditions) => {
  let response = false;
  const check = await dbGet("posts", { conditions }, "single");
  if (check) {
    response = check;
  }
  return response;
};

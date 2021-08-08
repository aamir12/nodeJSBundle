const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

const generateToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const uuid = () => uuidv4();

const compareAsync = (param1, param2) => {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(param1, param2, function (err, res) {
      if (res) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

module.exports = { generateToken, uuid, compareAsync };

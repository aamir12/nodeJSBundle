const {
  uuid: uniqueId,
  compareAsync,
  generateToken,
} = require("../../utils/authHelper");
const { dbexe } = require("../../utils/dbHelper");
exports.login = async (data) => {
  let response = {
    status: true,
    message: "",
  };

  const email = data.email;
  const password = data.password;
  const check_user_query = "SELECT * FROM users where email = ?";
  const check_user = await dbexe(check_user_query, [email], "single");
  if (check_user) {
    const hash = check_user.password;
    const userId = check_user.id;
    const email = check_user.email;
    const name = check_user.name;
    const checkPass = await compareAsync(password, hash);
    if (checkPass) {
      //for Single Device Login
      // const uuid = uniqueId();
      // await dbexe("update users set authToken=? where users_id=?", [
      //   uuid,
      //   users_id,
      // ]);

      let tokenData = {
        userId,
      };
      let token = generateToken(tokenData);
      return (response = {
        status: true,
        message: "Login Successfully.",
        data: {
          token,
          email: email,
          name: name,
        },
      });
    } else {
      return (response = {
        status: false,
        message: "Wrong Password",
      });
    }
  } else {
    return (response = {
      status: false,
      message: "Invalid login credential",
    });
  }
};

exports.userProfile = async (userId) => {
  let response = {
    status: false,
    message: "User not found !!",
  };

  const query = "SELECT * FROM users  where id = ?";
  const userProfileRow = await dbexe(query, [userId], "single");

  if (userProfileRow) {
    response["status"] = true;
    response["data"] = userProfileRow;
    delete response.message;
  }
  return response;
};

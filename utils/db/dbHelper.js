const db = require("../../config/db");

const dbexe = async (query, arr = [], records = "all") => {
  let data = false;
  if (arr.length > 0) {
    const [rows] = await db.query(query, arr);
    if (rows.length > 0) {
      data = rows.length == 1 && records == "single" ? rows[0] : rows;
    }
  } else {
    const [rows] = await db.query(query);
    if (rows.length > 0) {
      data = rows.length == 1 && records == "single" ? rows[0] : rows;
    }
  }
  console.log(data);
  return data;
};

module.exports = { dbexe, db };

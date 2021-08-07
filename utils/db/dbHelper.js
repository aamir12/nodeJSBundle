const db = require("../../config/db");

const dbexe = async (query, arr = [], records = "all") => {
  let data;
  if (arr.length > 0) {
    const [rows] = await db.query(query, arr);
    data = rows.length == 1 && records == "single" ? rows[0] : rows;
  } else {
    const [rows] = await db.query(query);
    data = rows.length == 1 && records == "single" ? rows[0] : rows;
  }
  return data;
};

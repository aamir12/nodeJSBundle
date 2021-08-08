const db = require("../config/db");
//run custom query
//query: custom query
//arr: array of values
//records: all|single
const dbexe = async (query, arr = [], records = "all") => {
  let data = false;
  queryRes = false;
  if (arr.length > 0) {
    const [rows] = await db.query(query, arr);
    queryRes = rows;
  } else {
    const [rows] = await db.query(query);
    queryRes = rows;
  }

  if (queryRes) {
    if (Array.isArray(queryRes) && queryRes.length > 0) {
      data =
        queryRes.length == 1 && records == "single" ? queryRes[0] : queryRes;
    } else if (queryRes instanceof Object && !Array.isArray(queryRes)) {
      data = queryRes;
    }
  }
  return data;
};

//insert
//table:table name
//data: data to be insert
//print: log query;
const dbInsert = async (table, data, print = false) => {
  let query = `INSERT into ${table} ( `;
  Object.keys(data).forEach((key) => {
    query = `${query} ${key},`;
  });

  query = query.slice(0, -1);
  query = `${query} ) values(`;

  let values = [];
  Object.keys(data).forEach((key) => {
    query = `${query} ?,`;
    values.push(data[key]);
  });

  query = query.slice(0, -1);
  query = `${query} )`;

  if (print) {
    console.log(query);
  }
  const dbRes = await dbexe(query, values);
  return dbRes ? dbRes : false;
};

//update
//table:table name
//data: data to be update
//condition: update condition
//print: log query
const dbUpdate = async (table, data, conditions = {}, print = false) => {
  let query = `Update  ${table} set `;
  let values = [];
  Object.keys(data).forEach((key) => {
    query = `${query} ${key} = ?,`;
    values.push(data[key]);
  });

  query = query.slice(0, -1);
  const conditionArr = Object.keys(conditions);
  if (conditionArr.length > 0) {
    query = `${query} where `;
    conditionArr.forEach((key) => {
      query = `${query} ${key} = ? and`;
      values.push(conditions[key]);
    });
    query = query.slice(0, -3);
  }

  if (print) {
    console.log(query);
  }
  const dbRes = await dbexe(query, values);
  return dbRes ? dbRes : false;
};

//table: table name
//type: all|single : all => all records, single => single record
//select: table fields
//conditions: conditions object
const dbGet = async (
  table,
  conditions = {},
  select = [],
  type = "all",
  print = false
) => {
  let query = `Select `;
  if (select.length > 0) {
    select.forEach((key) => {
      query = `${query} ${key},`;
    });
    query = query.slice(0, -1);
  } else {
    query = `${query} * `;
  }
  query = `${query} from ${table}`;

  const conditionArr = Object.keys(conditions);
  let values = [];
  if (conditionArr.length > 0) {
    query = `${query} where `;
    conditionArr.forEach((key) => {
      query = `${query} ${key} = ? and`;
      values.push(conditions[key]);
    });
    query = query.slice(0, -3);
  }

  if (print) {
    console.log(query);
  }
  const dbRes = await dbexe(query, values, type);
  return dbRes ? dbRes : false;
};

//table: table name
//conditions: conditions object
//print: log query
const dbDelete = async (table, conditions = {}, print = false) => {
  let query = `delete from  ${table}`;
  let values = [];
  const conditionArr = Object.keys(conditions);
  if (conditionArr.length > 0) {
    query = `${query} where `;
    conditionArr.forEach((key) => {
      query = `${query} ${key} = ? and`;
      values.push(conditions[key]);
    });
    query = query.slice(0, -3);
  }

  if (print) {
    console.log(query);
  }
  const dbRes = await dbexe(query, values);
  return dbRes ? dbRes : false;
};

module.exports = { dbexe, db, dbInsert, dbUpdate, dbGet, dbDelete };

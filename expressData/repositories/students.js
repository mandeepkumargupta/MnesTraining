const con = require("../config/mysql");
const util = require("util");
const queryAsync = util.promisify(con.query).bind(con);

exports.getAllData = async () => {
  const query = "select * from students";
  try {
    const results = await queryAsync(query);
    return results;
  } catch (error) {
    throw error;
  }
};

exports.createData = async (data) => {
  const query = "insert into students set ?";
  try {
    const results = await queryAsync(query, data);
    return results;
  } catch (error) {
    throw error;
  }
};

exports.getDataById = async (id) => {
  const query = "select * from students where id=?";
  try {
    const results = await queryAsync(query, id);
    return results;
  } catch (error) {
    throw error;
  }
};
exports.getDataByEmail = async (email) => {
  const query = "select * from students where email=?";
  try {
    const results = await queryAsync(query, email);
    return results;
  } catch (error) {
    throw error;
  }
};
exports.updateData = async (id, newData) => {
  const query = "update students set ? where id=?";
  try {
    const results = await queryAsync(query, [newData, id]);
    return results;
  } catch (error) {
    throw error;
  }
};

exports.deleteData = async (id) => {
  const query = "delete from students where id=?";
  try {
    const results = await queryAsync(query, id);
    return results;
  } catch (error) {
    throw error;
  }
};
// exports.getAllData = (callback) => {
//   const query = "select * from students";
//   con.query(query, (error, results) => {
//     if (error) {
//       return callback(error);
//     }
//     callback(null, results);
//   });
// };

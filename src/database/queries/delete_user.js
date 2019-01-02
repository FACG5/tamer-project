const dbconnection = require('../db_connection');

const deleteUser = data => new Promise((resolve, reject) => {
  const { userId } = data;
  const sql = {
    text: 'DELETE FROM "user" WHERE id=$1',
    values: [userId],
  };
  dbconnection.query(sql, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

module.exports = { deleteUser };

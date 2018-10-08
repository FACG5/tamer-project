const dbConnection = require('../db_connection');

const getAdmin = (username, cb) => {
  const sql = {
    text: 'SELECT * FROM admin WHERE user_name = $1 ',
    values: [username],
  };
  dbConnection.query(sql, (err, result) => {
    if (err) return cb(err);
    return cb(null, result.rows);
  });
};

module.exports = getAdmin;

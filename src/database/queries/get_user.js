const dbConnection = require('../db_connection');

const getUser = data => new Promise((resolve, reject) => {
  const { mobileNumberVal } = data;
  const sql = {
    text: 'SELECT id As "userId", name,  address , mobile_number AS "mobileNumber" FROM "user" WHERE mobile_number = $1 ',
    values: [mobileNumberVal],
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

module.exports = { getUser };

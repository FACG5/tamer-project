const dbConnection = require('../db_connection');

const setUser = userData => new Promise((resolve, reject) => {
  const {
    nameUserVal, mobileNumberUserVal, addressVal,
  } = userData;
  const sql = {
    text: `INSERT INTO "user"(name, address, mobile_number) VALUES ($1, $2, $3)
      RETURNING name,id As "userId",mobile_number As "mobileNumber"; `,
    values: [nameUserVal, addressVal, mobileNumberUserVal],
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

module.exports = { setUser };

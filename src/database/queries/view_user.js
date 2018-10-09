const dbConnection = require('../db_connection');

const getUsers = () => new Promise((resolve, reject) => {
  const sql = 'SELECT id AS "idUser", name AS "nameUser", address, mobile_number As "mobileNumber" FROM "user";';
  dbConnection.query(sql, (error, res) => {
    if (error) return reject(error);
    return resolve(res.rows);
  });
});

module.exports = {
  getUsers,
};

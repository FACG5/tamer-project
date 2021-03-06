const dbConnection = require('../db_connection');

const getStatistics = () => new Promise((resolve, reject) => {
  const sql = 'SELECT (SELECT count(*) FROM library )As "countlibraryBook" ,(SELECT count(*) FROM "user")AS "countUser",(SELECT sum(copy_number) From store )As "countstoreBook",(SELECT count(*) From borrow )As "countBorrowing"';
  dbConnection.query(sql, (error, res) => {
    if (error) return reject(error);
    return resolve(res.rows);
  });
});

module.exports = {
  getStatistics,
};

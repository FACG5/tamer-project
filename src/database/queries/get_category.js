const dbConnection = require('../db_connection');

const getCategory = () => new Promise((resolve, reject) => {
  const sql = {
    text: 'SELECT id, name, category_serial AS "categorySerial" FROM category;',
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

module.exports = { getCategory };

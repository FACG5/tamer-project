const dbConnection = require('../db_connection');

const getSingleCategory = data => new Promise((resolve, reject) => {
  const { categoryId } = data;
  const sql = {
    text: 'SELECT id AS "categoryId", name AS "categoryName", category_serial AS "categorySerial" FROM category WHERE id = $1 ',
    values: [categoryId],
  };

  dbConnection.query(sql, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

module.exports = { getSingleCategory };

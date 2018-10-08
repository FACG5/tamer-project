const dbConnection = require('../db_connection');

const setCategory = categoryData => new Promise((resolve, reject) => {
  const { nameCategoryVal, serialNumberVal } = categoryData;

  const sql = {
    text: 'INSERT INTO category(name, category_serial) VALUES ($1, $2) RETURNING name;',
    values: [nameCategoryVal, serialNumberVal],
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

module.exports = { setCategory };

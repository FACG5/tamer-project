const dbconnection = require('../db_connection');

const editCategory = data => new Promise((resolve, reject) => {
  const {
    categoryNameVal, categorySerialVal, categoryId,
  } = data;
  const sql = {
    text: 'UPDATE category SET name= $1, category_serial= $2 where id = $3',
    values: [categoryNameVal, categorySerialVal, categoryId],
  };
  dbconnection.query(sql, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

module.exports = { editCategory };

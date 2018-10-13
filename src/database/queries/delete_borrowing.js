const dbconnection = require('../db_connection');

const deleteBorrowing = data => new Promise((resolve, reject) => {
  const { idBorrow } = data;
  const sql = {
    text: 'DELETE FROM borrow WHERE id=$1',
    values: [idBorrow],
  };
  dbconnection.query(sql, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

module.exports = { deleteBorrowing };

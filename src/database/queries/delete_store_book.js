const dbconnection = require('../db_connection');

const deleteStoreBook = data => new Promise((resolve, reject) => {
  const { idStore } = data;
  const id = Number(idStore);
  const sql = {
    text: 'DELETE FROM store WHERE id = $1 ',
    values: [id],
  };
  dbconnection.query(sql, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

module.exports = { deleteStoreBook };

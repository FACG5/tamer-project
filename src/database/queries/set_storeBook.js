const dbConnection = require('../db_connection');

const setStoreBook = storeBookData => new Promise((resolve, reject) => {
  const {
    bookId, copyNumberVal,
  } = storeBookData;
  const sql = {
    text: `INSERT INTO store
     (book_id, copy_number)
      VALUES ($1, $2) 
      RETURNING copy_number As "copyNumber",book_id As "bookId";`,
    values: [bookId, copyNumberVal],
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

module.exports = { setStoreBook };

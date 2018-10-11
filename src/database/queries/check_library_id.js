const dbConnection = require('../db_connection');

const checkLibraryId = bookLibraryIdVal => new Promise((resolve, reject) => {
  const sql = {
    text: 'select id from borrow where book_library_id =$1 ',
    values: [bookLibraryIdVal],
  };

  dbConnection.query(sql, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

module.exports = { checkLibraryId };

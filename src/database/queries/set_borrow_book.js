const dbConnection = require('../db_connection');

const setBorrowBook = borrowBookData => new Promise((resolve, reject) => {
  const { userIdVal, LibraryIdVal } = borrowBookData;

  const sql = {
    text: `INSERT INTO borrow(user_id, book_library_id) 
           VALUES ($1, $2)
           RETURNING user_id AS "userId",book_library_id AS bookLibraryId,
                    TO_CHAR(end_date, 'YYYY-MM-DD') AS "endDate",
                    TO_CHAR(start_date, 'YYYY-MM-DD') AS "startDate";`,
    values: [userIdVal, LibraryIdVal],
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

module.exports = { setBorrowBook };

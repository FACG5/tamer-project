const dbConnection = require('../db_connection');

const getBorrowedBooksByUserId = userId => new Promise((resolve, reject) => {
  const sql = {
    text: `SELECT library.id AS "libraryId", borrow.id AS "idBorrow", book.name_book AS             "nameBook",TO_CHAR(end_date, 'YYYY-MM-DD') AS "endDate", book.category_serial AS          "category",library.bookshelf,library.section,library.copy_id AS "copyId" From borrow
           JOIN "user" on borrow.user_id = "user".id JOIN library on library.id= borrow.book_library_id JOIN book on library.book_id = book.id WHERE borrow.user_id = $1`,
    values: [userId],
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

module.exports = { getBorrowedBooksByUserId };

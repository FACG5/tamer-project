const dbConnection = require('../db_connection');

const getLibraryBooks = () => new Promise((resolve, reject) => {
  const sql = 'SELECT library.id AS "idLibrary", book.name_book AS "nameBook", book.name_author AS "nameAuthor",  book.category_serial AS "category", library.bookshelf AS "bookShelf", library.section, library.copy_id AS "copyId", COALESCE(borrow.id, 0) AS "caseBook" FROM library JOIN book on library.book_id = book.id LEFT JOIN borrow on book_library_id= library.id ORDER BY library.id;';
  dbConnection.query(sql, (error, res) => {
    if (error) return reject(error);
    return resolve(res.rows);
  });
});

const getBorrowBooks = () => new Promise((resolve, reject) => {
  const sql = 'SELECT borrow.id AS "idBorrow", "user".name AS "nameUser","user".mobile_number AS "mobileNumber", book.name_book AS "nameBook", TO_CHAR(start_date, \'YYYY-MM-DD\') AS "startDate", TO_CHAR(end_date, \'YYYY-MM-DD\') AS "endDate" From borrow JOIN "user" on borrow.user_id = "user".id JOIN library on library.id= borrow.book_library_id JOIN book on library.book_id = book.id ORDER BY borrow.end_date';
  dbConnection.query(sql, (error, res) => {
    if (error) return reject(error);
    return resolve(res.rows);
  });
});

const getStoreBooks = () => new Promise((resolve, reject) => {
  const sql = 'SELECT store.id AS "idStore", book.name_book AS "nameBook", book.name_author AS "nameAuthor", book.category_serial AS "category", store.copy_number AS "copyNumber" FROM store JOIN book on store.book_id = book.id;';
  dbConnection.query(sql, (error, res) => {
    if (error) return reject(error);
    return resolve(res.rows);
  });
});

module.exports = {
  getLibraryBooks,
  getBorrowBooks,
  getStoreBooks,
};

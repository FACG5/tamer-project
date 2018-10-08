const dbConnection = require('../db_connection');

const getLibraryBooks = () => new Promise((resolve, reject) => {
  const sql = 'SELECT library.id AS "idLibrary", book.name_book AS "nameBook", book.name_author AS "nameAuthor",  book.category_serial AS "category", library.bookshelf AS "bookShelf", library.section, library.copy_id AS "copyId", COALESCE(borrow.id, 0) AS "caseBook" FROM library JOIN book on library.book_id = book.id LEFT JOIN borrow on book_library_id= library.id ORDER BY library.id;';
  dbConnection.query(sql, (error, res) => {
    if (error) return reject(error);
    return resolve(res.rows);
  });
});

module.exports = {
  getLibraryBooks,
};

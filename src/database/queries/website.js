const dbConnection = require('../db_connection');

const getSearchedBook = str => new Promise((resolve, reject) => {
  const sql = {
    text: 'SELECT library.id AS "idLibrary", book.name_book AS "nameBook", book.name_author AS "nameAuthor", book.category_serial AS "category", book.image_url AS "imageUrl", library.bookshelf AS "bookShelf", library.section, library.copy_id AS "copyId", COALESCE(borrow.id, 0) AS "caseBook"FROM library JOIN book on library.book_id = book.id LEFT JOIN borrow on book_library_id= library.id where book.name_book ILIKE $1 OR book.name_author ILIKE $1 ORDER BY library.id',
    values: [`%${str}%`],
  };
  dbConnection.query(sql, (error, res) => {
    if (error) return reject(error);
    return resolve(res.rows);
  });
});

const getMostBooks = () => new Promise((resolve, reject) => {
  const sql = 'SELECT count.*, book.name_book AS "name", book.image_url AS "imageUrl" FROM library JOIN (SELECT COUNT(borrow.id), library.book_id AS "bookLibraryId" FROM borrow JOIN library on borrow.book_library_id = library.id GROUP BY library.book_id)AS "count" on library.id = "count"."bookLibraryId" JOIN book on library.book_id = book.id LIMIT 4';
  dbConnection.query(sql, (error, res) => {
    if (error) return reject(error);
    return resolve(res.rows);
  });
});

module.exports = {
  getSearchedBook,
  getMostBooks,
};

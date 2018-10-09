const dbConnection = require('../db_connection');

const getSingleBookByLibraryId = data => new Promise((resolve, reject) => {
  const { libraryId } = data;
  const sql = {
    text: 'SELECT book.name_book AS "nameBook", book.name_author AS "nameAuthor", book.description, book.category_serial AS "categorySerial", library.bookshelf AS "bookShelf", library.section, library.copy_id AS "copyId", book.image_url AS "img", library.id AS "libraryId", category.name AS "categoryName" FROM library JOIN book on library.book_id = book.id JOIN category on category.category_serial = book.category_serial WHERE library.id  = $1 ',
    values: [libraryId],
  };

  dbConnection.query(sql, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

module.exports = { getSingleBookByLibraryId };

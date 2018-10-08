const dbConnection = require('../db_connection');

const setLibraryBook = libraryBookData => new Promise((resolve, reject) => {
  const {
    bookId, bookshelfVal, sectionVal, copyIdVal,
  } = libraryBookData;
  const sql = {
    text: `INSERT INTO library
      (book_id, bookshelf, section, copy_id) 
      VALUES ($1, $2, $3, $4)
      RETURNING bookshelf,book_id As "bookId"; `,
    values: [bookId, bookshelfVal, sectionVal, copyIdVal],
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

module.exports = { setLibraryBook };

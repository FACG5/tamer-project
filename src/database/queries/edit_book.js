const dbconnection = require('../db_connection');

const editBookInfo = bookData => new Promise((resolve, reject) => {
  const {
    nameBookVal, nameAuthorVal, descriptionVal, imgVal, bookId,
  } = bookData;
  const sql = {
    text: 'UPDATE book SET name_book=$2, name_author=$3, image_url=$4, description=$5 WHERE id=$1;',
    values: [bookId, nameBookVal, nameAuthorVal, imgVal, descriptionVal],
  };
  dbconnection.query(sql, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

const editLibraryInfo = libraryData => new Promise((resolve, reject) => {
  const { bookShelfVal, sectionVal, libraryId } = libraryData;
  const sql = {
    text: 'UPDATE library SET bookshelf=$1, section=$2 where id =$3',
    values: [bookShelfVal, sectionVal, libraryId],
  };
  dbconnection.query(sql, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

module.exports = { editBookInfo, editLibraryInfo };

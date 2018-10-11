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

module.exports = { editBookInfo };

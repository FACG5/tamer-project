const dbConnection = require('../db_connection');

const setBook = bookData => new Promise((resolve, reject) => {
  const {
    nameBookVal,
    nameAuthorVal,
    imageBookVal,
    descriptionVal,
    categorySerial,
  } = bookData;
  const sql = {
    text: `INSERT INTO book
       (name_book, name_author, image_url, description, category_serial )
       VALUES
       ($1, $2, $3, $4, $5)
       RETURNING id,category_serial AS "categorySerial";`,
    values: [nameBookVal, nameAuthorVal, imageBookVal, descriptionVal, categorySerial],
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

module.exports = { setBook };

const dbConnection = require('../db_connection');

const getSingleBookByStoreId = data => new Promise((resolve, reject) => {
  const { storeId } = data;
  const sql = {
    text: 'SELECT book.name_book AS "nameBook", book.name_author AS "nameAuthor", book.description, book.category_serial AS "categorySerial", book.image_url AS "img", store.copy_number AS "copyNumber", store.id AS "storeId", category.name AS "categoryName" FROM store JOIN book on store.book_id = book.id JOIN category on category.category_serial = book.category_serial WHERE store.id  = $1 ',
    values: [storeId],
  };

  dbConnection.query(sql, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

module.exports = { getSingleBookByStoreId };

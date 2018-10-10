const dbconnection = require('../db_connection');

const deleteLibraryBook = data => new Promise((resolve, reject) => {
  const { libraryId } = data;
  const sql = {
    text: 'DELETE FROM library WHERE id = $1  ',
    values: [libraryId],
  };
  dbconnection.query(sql, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

module.exports = { deleteLibraryBook };

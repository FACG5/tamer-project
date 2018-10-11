const dbconnection = require('../db_connection');

const deleteLibraryBook = data => new Promise((resolve, reject) => {
  const { idLibrary } = data;
  const id = Number(idLibrary);
  const sql = {
    text: 'DELETE FROM library WHERE id = $1 ',
    values: [id],
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

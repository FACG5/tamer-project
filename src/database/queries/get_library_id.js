const dbConnection = require('../db_connection');

const getLibraryId = data => new Promise((resolve, reject) => {
  const {
    bookshelfVal, copyIdVal, sectionsVal, libraryIdVal,
  } = data;
  const sql = {
    text: 'select id AS "LibraryId" from library where bookshelf=$1 and copy_id=$2 and section=$3  and id=$4 ',
    values: [bookshelfVal, copyIdVal, sectionsVal, libraryIdVal],
  };

  dbConnection.query(sql, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

module.exports = { getLibraryId };

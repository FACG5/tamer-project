const dbConnection = require('../db_connection');

const getUsers = () => new Promise((resolve, reject) => {
  const sql = 'SELECT id AS "idUser", name AS "nameUser", address, mobile_number As "mobileNumber" FROM "user";';
  dbConnection.query(sql, (error, res) => {
    if (error) return reject(error);
    return resolve(res.rows);
  });
});

const getBorrower = () => new Promise((resolve, reject) => {
  const sql = 'SELECT borrow.id AS "idBorrow", "user".name AS "nameUser" ,"user".address,"user".mobile_number As "mobileNumber",TO_CHAR(borrow.start_date, \'YYYY-MM-DD\') AS "startDate", TO_CHAR(borrow.end_date, \'YYYY-MM-DD\') AS "endDate" ,book.name_book As nameBook FROM  "user"  join borrow ON borrow.user_id = "user".id join library ON library.id = borrow.book_library_id join book ON book.id = library.book_id';
  dbConnection.query(sql, (error, res) => {
    if (error) return reject(error);
    return resolve(res.rows);
  });
});

module.exports = {
  getUsers,
  getBorrower,
};

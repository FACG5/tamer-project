const dbConnection = require('../db_connection');

const getUsers = () => new Promise((resolve, reject) => {
  const sql = 'SELECT id AS "idUser", name AS "nameUser", address, mobile_number As "mobileNumber" FROM "user";';
  dbConnection.query(sql, (error, res) => {
    if (error) return reject(error);
    return resolve(res.rows);
  });
});

const getBorrower = () => new Promise((resolve, reject) => {
  const sql = 'SELECT  "user".name AS "nameUser" ,"user".address,"user".mobile_number As "mobileNumber",borrow.start_date AS "startDate" ,borrow.end_date AS "endDate" ,book.name_book As nameBook FROM  "user"  join borrow ON borrow.user_id = "user".id join library ON library.id = borrow.book_library_id join book ON book.id = library.book_id';
  dbConnection.query(sql, (error, res) => {
    if (error) return reject(error);
    return resolve(res.rows);
  });
});

module.exports = {
  getUsers,
  getBorrower,
};

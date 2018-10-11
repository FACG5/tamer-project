const { getBorrowedBooksByUserId } = require('../database/queries/get_borrowed_books_by_user_id');
const { getUser } = require('../database/queries/get_user');
const { setUser } = require('../database/queries/set_user');

exports.get = (request, response) => {
  response.render('view_borrow',
    {
      viewBorrow: 'active',
      borrow: 'active',
      layout: 'admin',
      title: 'اﻹعارة',
      style: ['borrow'],
      js: ['borrow', 'add_user'],
    });
};

exports.post = (request, response, next) => {
  getUser(request.body)
    .then((resultUser) => {
      const resultBorrowedBooksByUserId = [];
      if (resultUser.length) {
        const { userId } = resultUser[0];
        getBorrowedBooksByUserId(userId)
          .then((resarr) => {
            resarr.forEach((res) => {
              const serialNumber = `${res.category}.${res.bookshelf}.${res.section}.${res.copyId}`;
              const data = {
                nameBook: res.nameBook,
                endDate: res.endDate,
                serialNumber,
                idBorrow: res.idBorrow,
              };
              resultBorrowedBooksByUserId.push(data);
            });
            response.send(JSON.stringify({ resultUser, resultBorrowedBooksByUserId }));
          });
      } else {
        response.send(JSON.stringify({ resultUser, resultBorrowedBooksByUserId }));
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.addUser = (req, response, next) => {
  const userData = req.body;
  setUser(userData)
    .then((results) => {
      const result = { message: 'User Added !' };
      response.send(JSON.stringify(result));
    })
    .catch((err) => {
      next(err);
    });
};

exports.addUser = (req, response, next) => {
  const userData = req.body;
  setUser(userData)
    .then((results) => {
      const mobileNumberUser = results[0].mobileNumber;
      const result = { message: 'User Added !', mobileNumberUser };
      response.send(JSON.stringify(result));
    })
    .catch((err) => {
      next(err);
    });
};

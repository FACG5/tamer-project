const { getBorrowedBooksByUserId } = require('../database/queries/get_borrowedBooksByUserId');
const { getUser } = require('../database/queries/get_user');

exports.get = (request, response) => {
  response.render('view_borrow',
    {
      viewBorrow: 'active',
      borrow: 'active',
      layout: 'admin',
      title: 'اﻹعارة',
      style: 'borrow',
      js: ['borrow'],
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

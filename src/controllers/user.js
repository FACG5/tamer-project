const { getUsers, getBorrower } = require('../database/queries/view_user');

exports.getViewUser = (request, response, next) => {
  getUsers()
    .then((res) => {
      response.render('view_user',
        {
          viewUser: 'active',
          user: 'active',
          layout: 'admin',
          title: 'اﻷعضاء',
          style: ['user', 'book'],
          js: ['user'],
          res,
        });
    })
    .catch(error => next(error));
};

exports.getBorrowedUser = (request, response, next) => {
  getBorrower()
    .then((res) => {
      response.render('view_user',
        {
          borrowedUser: 'active',
          user: 'active',
          layout: 'admin',
          title: 'المستعيرين',
          style: ['user'],
          js: ['user'],
          res,
        });
    })
    .catch(error => next(error));
};

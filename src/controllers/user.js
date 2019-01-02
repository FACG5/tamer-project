const { getUsers, getBorrower } = require('../database/queries/view_user');
const { deleteUser } = require('../database/queries/delete_user');

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

exports.deleteUsers = (request, response, next) => {
  const userId = request.body;
  deleteUser(userId)
    .then(() => {
      const result = { message: ' تم حذف العضو  !' };
      return response.json(result);
    })
    .catch((err) => {
      if (err.code === '23503') {
        const result = { message: 'هذا العضو من المستعيرين حاليا، لايمكن حذفه. بأمكانك ازالة الكتب التي استعارها العضو من قسم الاستعارة ومن ثم حذفه ...' };
        return response.json(result);
      }
      next(err);
    });
};

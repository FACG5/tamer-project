exports.getViewUser = (request, response) => {
  response.render('view_user',
    {
      viewUser: 'active',
      user: 'active',
      layout: 'admin',
      title: 'اﻷعضاء',
      style: 'user',
      js: 'user',
    });
};


exports.getBorrowedUser = (request, response) => {
  response.render('view_user',
    {
      borrowedUser: 'active',
      user: 'active',
      layout: 'admin',
      title: 'اﻷعضاء',
      style: 'user',
      js: 'user',
    });
};

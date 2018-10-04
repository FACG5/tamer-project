exports.get = (request, response) => {
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

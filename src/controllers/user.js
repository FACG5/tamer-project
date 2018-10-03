exports.get = (request, response) => {
  response.render('view_user',
    {
      view_user: 'active',
      user: 'active',
      layout: 'admin',
      title: 'اﻷعضاء',
      style: 'user',
      js: 'user',
    });
};

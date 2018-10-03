exports.get = (request, response) => {
  response.render('view_user',
    {
      borrowed_user: 'active',
      user: 'active',
      layout: 'admin',
      title: 'اﻷعضاء',
      style: 'user',
      js: 'user',
    });
};

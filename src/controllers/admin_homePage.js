exports.get = (request, response) => {
  response.render('admin_homePage',
    {
      adminHomePage: 'active',
      layout: 'admin',
      title: 'الرئيسية',
    });
};

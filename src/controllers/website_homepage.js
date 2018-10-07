exports.get = (request, response) => {
  response.render('website_homepage',
    {
      layout: 'website',
      title: 'الرئيسية',
      js: 'website',
    });
};

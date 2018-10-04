exports.get = (request, response) => {
  response.render('view_books',
    {
      viewBooks: 'active',
      layout: 'admin',
      title: 'الكتب',
      style: 'book',
      js: 'book',
    });
};

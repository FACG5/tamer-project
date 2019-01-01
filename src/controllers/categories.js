const { getCategory } = require('../database/queries/get_category');

exports.getCategoryTab = (request, response, next) => {
  getCategory()
    .then((resCategory) => {
      response.render('view_books',
        {
          categoryTab: 'active',
          book: 'active',
          layout: 'admin',
          title: 'التصنيفات',
          style: ['book'],
          js: ['book'],
          resCategory,
        });
    }).catch((err) => {
      next(err);
    });
};

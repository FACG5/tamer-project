const { getCategory } = require('../database/queries/get_category');
const { getSingleCategory } = require('../database/queries/get_single_category');

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

exports.editSingleCategoryView = (request, response, next) => {
  const id = request.params;
  getSingleCategory(id)
    .then((results) => {
      response.render('edit_category',
        {
          book: 'active',
          layout: 'admin',
          title: 'تعديل التصنيف',
          style: ['book', 'category'],
          js: ['edit_category'],
          results,
        });
    })
    .catch((err) => {
      next(err);
    });
};

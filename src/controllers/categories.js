const { getCategory } = require('../database/queries/get_category');
const { getSingleCategory } = require('../database/queries/get_single_category');
const { editCategory } = require('../database/queries/edit_category');

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

exports.editSingleCategory = (request, response, next) => {
  const data = request.body;
  editCategory(data)
    .then(() => {
      const result = { message: ' تم التعديل بنجاح!' };
      return response.json(result);
    })
    .catch((err) => {
      if (err.code === '23505') {
        const result = { errorMessage: 'اسم التصنيف / الرقم التسلسلي موجود حاليا' };
        return response.json(result);
      }
      next(err);
    });
};

const { getSingleBookByLibraryId } = require('../database/queries/get_single_book_by_library_id');

exports.getSingleLibraryBook = (request, response, next) => {
  const id = request.params;
  getSingleBookByLibraryId(id)
    .then((results) => {
      response.render('view_library_book',
        {
          book: 'active',
          layout: 'admin',
          title: 'عرض كتاب',
          style: ['book', 'single_book'],
          js: ['book'],
          admin: 'admin',
          results,
        });
    })
    .catch((err) => {
      next(err);
    });
};

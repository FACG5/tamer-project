const { getSingleBookByLibraryId } = require('../database/queries/get_single_book_by_library_id');
const { getSingleBookByStoreId } = require('../database/queries/get_single_book_by_store_id');
const { deleteLibraryBook } = require('../database/queries/delete_library_book');
const { deleteStoreBook } = require('../database/queries/delete_store_book');

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

exports.getSingleStoreBook = (request, response, next) => {
  const id = request.params;
  getSingleBookByStoreId(id)
    .then((results) => {
      response.render('view_store_book',
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

exports.deleteBookFromLibrary = (request, response) => {
  const id = request.body;
  deleteLibraryBook(id)
    .then(() => {
      const result = { message: 'Book is Deleted !' };
      return response.json(result);
    })
    .catch((err) => {
      response.json(err);
    });
};

exports.deleteBookFromStore = (request, response) => {
  const id = request.body;
  deleteStoreBook(id)
    .then(() => {
      const result = { message: 'Book is Deleted !' };
      return response.json(result);
    })
    .catch((err) => {
      response.json(err);
    });
};

const { getSingleBookByLibraryId } = require('../database/queries/get_single_book_by_library_id');
const { getSingleBookByStoreId } = require('../database/queries/get_single_book_by_store_id');
const { deleteLibraryBook } = require('../database/queries/delete_library_book');
const { deleteStoreBook } = require('../database/queries/delete_store_book');
const { editBookInfo, editLibraryInfo, editStoreInfo } = require('../database/queries/edit_book');

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
      const result = { message: ' تم حذف الكتاب  !' };
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
      const result = { message: '  تم حذف الكتاب !' };
      return response.json(result);
    })
    .catch((err) => {
      response.json(err);
    });
};

exports.editSingleLibraryBookView = (request, response, next) => {
  const id = request.params;
  getSingleBookByLibraryId(id)
    .then((results) => {
      response.render('edit_library_book',
        {
          book: 'active',
          layout: 'admin',
          title: 'تعديل كتاب',
          style: ['book', 'single_book'],
          js: ['edit_library_book'],
          admin: 'admin',
          results,
        });
    })
    .catch((err) => {
      next(err);
    });
};

exports.editSingleLibraryBook = (request, response, next) => {
  const data = request.body;
  editBookInfo(data)
    .then(() => {
      editLibraryInfo(data)
        .then(() => {
          const result = { message: ' تم التعديل بنجاح!' };
          return response.json(result);
        }).catch((err) => {
          if (err.code === '22003') {
            const result = { errorMessage: 'لا يجب ان يتجاوز الرقم 8 خانات' };
            return response.json(result);
          }
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

exports.editSingleStoreBookView = (request, response, next) => {
  const id = request.params;
  getSingleBookByStoreId(id)
    .then((results) => {
      response.render('edit_store_book',
        {
          book: 'active',
          layout: 'admin',
          title: 'تعديل كتاب',
          style: ['book', 'single_book'],
          js: ['edit_store_book'],
          admin: 'admin',
          results,
        });
    })
    .catch((err) => {
      next(err);
    });
};

exports.editSingleStoreBook = (request, response, next) => {
  const data = request.body;
  editBookInfo(data)
    .then(() => {
      editStoreInfo(data)
        .then(() => {
          const result = { message: 'تم التعديل بنجاح' };
          return response.json(result);
        }).catch((err) => {
          if (err.code === '22003') {
            const result = { errorMessage: 'لا يجب ان يتجاوز الرقم 8 خانات' };
            return response.json(result);
          }
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

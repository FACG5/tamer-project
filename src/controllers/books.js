const { getCategory } = require('../database/queries/get_category');
const { setCategory } = require('../database/queries/set_category');
const { setLibraryBook } = require('../database/queries/set_libraryBook');
const { setBook } = require('../database/queries/set_book');
const { getLibraryBooks, getStoreBooks, getBorrowBooks } = require('../database/queries/view_book');
const { status } = require('../views/helpers/index');
const { setStoreBook } = require('../database/queries/set_storeBook');

exports.getLibraryBooks = (request, response, next) => {
  getLibraryBooks()
    .then((resLibraryBooks) => {
      response.render('view_books',
        {
          libraryBooks: 'active',
          book: 'active',
          layout: 'admin',
          title: 'عرض المكتبة',
          style: 'book',
          js: ['book'],
          resLibraryBooks,
          status,
        });
    })
    .catch(err => next(err));
};

exports.getStoreBooks = (request, response, next) => {
  getStoreBooks()
    .then((resStoreBooks) => {
      response.render('view_books',
        {
          storeBooks: 'active',
          book: 'active',
          layout: 'admin',
          title: 'عرض المخزن',
          style: 'book',
          js: ['book'],
          admin: 'admin',
          resStoreBooks,
        });
    })
    .catch(err => next(err));
};

exports.getBorrowedBooks = (request, response, next) => {
  getBorrowBooks()
    .then((resBorrowBooks) => {
      response.render('view_books',
        {
          borrowedBooks: 'active',
          book: 'active',
          layout: 'admin',
          title: 'عرض المستعار',
          style: 'book',
          js: ['book'],
          admin: 'admin',
          resBorrowBooks,
        });
    })
    .catch(err => next(err));
};

exports.getAddBookTab = (request, response, next) => {
  getCategory()
    .then((res) => {
      response.render('view_books',
        {
          res,
          addBookTab: 'active',
          book: 'active',
          layout: 'admin',
          title: 'الكتب',
          style: 'book',
          js: ['book', 'book_library', 'book_store'],
        });
    }).catch((err) => {
      next(err);
    });
};

exports.addCategory = (req, response, next) => {
  const categoryData = req.body;
  setCategory(categoryData)
    .then((results) => {
      const result = { errorMessage: null, message: 'category Added !' };
      response.send(JSON.stringify(result));
    })
    .catch((err) => {
      const errorMessage = err.detail;
      if (err.code === '23505') {
        const result = { errorMessage: 'This category is Already Exists' };
        return response.send(JSON.stringify(result));
      }
      next(err);
    });
};

exports.addBook = (req, response, next) => {
  const bookData = req.body;
  setBook(bookData)
    .then((results) => {
      const bookId = results[0].id;
      const categorySerials = results[0].categorySerial;
      const result = { message: 'Book Added !', bookId, categorySerials };
      response.send(JSON.stringify(result));
    })
    .catch((err) => {
      next(err);
    });
};

exports.addLibraryBook = (req, response, next) => {
  const libraryBookData = req.body;
  const array = [];
  const {
    bookId, bookshelfVal, sectionVal, copyIdVal,
  } = libraryBookData;
  for (let copyId = 1; copyId <= copyIdVal; copyId += 1) {
    const dataLibrary = {
      bookId, bookshelfVal, sectionVal, copyId,
    };
    setLibraryBook(dataLibrary)
      .then((results) => {
        array.push(results);
      })
      .catch((err) => {
        next(err);
      });
  }
  const result = { message: 'Book Library Added !' };
  response.send(JSON.stringify(result));
};

exports.addStoreBook = (req, response, next) => {
  const storeBookData = req.body;
  setStoreBook(storeBookData)
    .then((results) => {
      const result = { message: 'storeBook Added !' };
      response.send(JSON.stringify(result));
    })
    .catch((err) => {
      next(err);
    });
};

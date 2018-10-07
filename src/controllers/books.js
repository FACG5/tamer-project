const { getCategory } = require('../database/queries/get_category');
const { setCategory } = require('../database/queries/set_category');
const { setBook } = require('../database/queries/set_book');

exports.getLibraryBooks = (request, response) => {
  response.render('view_books',
    {
      libraryBooks: 'active',
      book: 'active',
      layout: 'admin',
      title: 'الكتب',
      style: 'book',
      js: 'book',
    });
};

exports.getStoreBooks = (request, response) => {
  response.render('view_books',
    {
      storeBooks: 'active',
      book: 'active',
      layout: 'admin',
      title: 'الكتب',
      style: 'book',
      js: 'book',
    });
};

exports.getBorrowedBooks = (request, response) => {
  response.render('view_books',
    {
      borrowedBooks: 'active',
      book: 'active',
      layout: 'admin',
      title: 'الكتب',
      style: 'book',
      js: 'book',
    });
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
          js: 'book',
        });
    }).catch((err) => {
      next(err);
    });
};

exports.addCategory = (req, response) => {
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
      const result = { errorMessage };
      return response.send(JSON.stringify(result));
    });
};

exports.addBook = (req, response, next) => {
  const bookData = req.body;
  setBook(bookData)
    .then((results) => {
      const bookId = results[0].id;
      const categorySerial = results[0].category_serial;
      const result = { message: 'Book Added !', bookId, categorySerial };
      response.send(JSON.stringify(result));
    })
    .catch((err) => {
      next(err);
    });
};

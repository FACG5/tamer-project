const { getLibraryBooks } = require('../database/queries/book');
const { status } = require('../views/helpers/index');


exports.getLibraryBooks = (request, response) => {
  getLibraryBooks()
    .then((resLibraryBooks) => {
      response.render('view_books',
        {
          libraryBooks: 'active',
          book: 'active',
          layout: 'admin',
          title: 'عرض المكتبة',
          style: 'book',
          js: 'book',
          admin: 'admin',
          resLibraryBooks,
          status,
        });
    })
    .catch(err => console.log(err));
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

exports.getAddBookTab = (request, response) => {
  response.render('view_books',
    {
      addBookTab: 'active',
      book: 'active',
      layout: 'admin',
      title: 'الكتب',
      style: 'book',
      js: 'book',
    });
};

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

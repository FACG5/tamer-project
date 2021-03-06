const { getCategory } = require('../database/queries/get_category');
const { setCategory } = require('../database/queries/set_category');
const { setLibraryBook } = require('../database/queries/set_libraryBook');
const { setBook } = require('../database/queries/set_book');
const { getLibraryBooks, getStoreBooks, getBorrowBooks } = require('../database/queries/view_book');
const { status, compare } = require('../views/helpers/index');
const { setStoreBook } = require('../database/queries/set_storeBook');
const twilio = require('twilio');

exports.getLibraryBooks = (request, response, next) => {
  getLibraryBooks()
    .then((resLibraryBooks) => {
      response.render('view_books',
        {
          libraryBooks: 'active',
          book: 'active',
          layout: 'admin',
          title: 'عرض المكتبة',
          style: ['book'],
          js: ['book', 'book_library'],
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
          style: ['book'],
          js: ['book', 'book_store'],
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
          style: ['book'],
          js: ['book'],
          admin: 'admin',
          resBorrowBooks,
          compare,
        });
    })
    .catch(err => next(err));
};

exports.postBorrowedBooks = (request, response, next) => {
  const { mobileNumber } = request.body;
  const accountSid = process.env.SID;
  const authToken = process.env.AUTH;
  const client = new twilio(accountSid, authToken);

  const number = process.env.MOBILE;
  client.messages.create({
    from: number,
    to: `+97${mobileNumber}`,
    body: 'تذكير : تأخر موعد تسليم الكتاب  - مكتبة تامر',
  }, (error, message) => {
    if (!error) {
      response.send({ result: message });
    } else {
      next(error);
    }
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
          style: ['book'],
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
      const result = { errorMessage: null, message: 'تمت إضافة التصنيف بنجاح!' };
      response.send(JSON.stringify(result));
    })
    .catch((err) => {
      const errorMessage = err.detail;
      if (err.code === '23505') {
        const result = { errorMessage: 'هذا التصنيف موجود فعلا' };
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
      const result = { message: 'تمت إضافة الكتاب بنجاح !', bookId, categorySerials };
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
  const result = { message: 'تمت إضافة الكتاب الى المكتبة بنجاح!' };
  response.send(JSON.stringify(result));
};

exports.addStoreBook = (req, response, next) => {
  const storeBookData = req.body;
  setStoreBook(storeBookData)
    .then((results) => {
      const result = { message: 'تمت إضافة الكتاب الى المخزن بنجاح!' };
      response.send(JSON.stringify(result));
    })
    .catch((err) => {
      next(err);
    });
};

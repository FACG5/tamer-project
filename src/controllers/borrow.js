const {
  getBorrowedBooksByUserId,
} = require('../database/queries/get_borrowed_books_by_user_id');
const { getUser } = require('../database/queries/get_user');
const { setUser } = require('../database/queries/set_user');
const { getLibraryId } = require('../database/queries/get_library_id');
const { setBorrowBook } = require('../database/queries/set_borrow_book');
const { checkLibraryId } = require('../database/queries/check_library_id');
const { deleteBorrowing } = require('../database/queries/delete_borrowing');
const { getCategory } = require('../database/queries/get_category');

exports.get = (request, response) => {
  getCategory().then((res) => {
    response.render('view_borrow', {
      res,
      viewBorrow: 'active',
      borrow: 'active',
      layout: 'admin',
      title: 'اﻹعارة',
      style: ['borrow'],
      js: ['borrow', 'add_user', 'add_book_to_user'],
    });
  });
};

exports.post = (request, response, next) => {
  getUser(request.body)
    .then((resultUser) => {
      const resultBorrowedBooksByUserId = [];
      if (resultUser.length) {
        const { userId } = resultUser[0];
        getBorrowedBooksByUserId(userId).then((resarr) => {
          resarr.forEach((res) => {
            const serialNumber = `${res.category}.${res.section}.${
              res.bookshelf
            }.${res.copyId}`;
            const data = {
              nameBook: res.nameBook,
              endDate: res.endDate,
              serialNumber,
              idBorrow: res.idBorrow,
            };
            resultBorrowedBooksByUserId.push(data);
          });
          response.send(
            JSON.stringify({ resultUser, resultBorrowedBooksByUserId }),
          );
        });
      } else {
        response.send(
          JSON.stringify({ resultUser, resultBorrowedBooksByUserId }),
        );
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.addUser = (req, response, next) => {
  const userData = req.body;
  setUser(userData)
    .then((results) => {
      const mobileNumberUser = results[0].mobileNumber;
      const result = { message: 'تمت إضافة العضو بنجاح !', mobileNumberUser };
      return response.json(result);
    })
    .catch((err) => {
      response.json(err);
    });
};

exports.addBookToUser = (request, response, next) => {
  const data = request.body;
  const userIdVal = data.userId;
  const object = {
    copyIdVal: data.copyIdVal,
    bookshelfVal: data.bookshelfVal,
    sectionsVal: data.sectionsVal,
    libraryIdVal: data.libraryIdVal,
  };
  getLibraryId(object)
    .then((resultLibrary) => {
      if (resultLibrary.length > 0) {
        const LibraryIdVal = resultLibrary[0].LibraryId;
        checkLibraryId(LibraryIdVal).then((resultborrow) => {
          if (resultborrow.length === 0) {
            const dataBorrow = { userIdVal, LibraryIdVal };
            setBorrowBook(dataBorrow).then((resultBorrow) => {
              const result = {
                message: 'تمت الإضافة بنجاح',
                resultLibrary,
                resultBorrow,
              };
              return response.json(result);
            });
          } else {
            const message = { message: ' هذا الكتاب مستعار ', resultborrow };
            return response.json(message);
          }
        });
      } else {
        const result = { message: 'الكتاب غير موجود', resultLibrary };
        return response.json(result);
      }
    })
    .catch((err) => {
      response.json(err);
    });
};

exports.deleteBorrowing = (request, response, next) => {
  const idBorrow = request.body;
  deleteBorrowing(idBorrow)
    .then(() => {
      const result = { message: 'تمت عملية الحذف بنجاح !' };
      return response.json(result);
    })
    .catch((err) => {
      response.json(err);
    });
};

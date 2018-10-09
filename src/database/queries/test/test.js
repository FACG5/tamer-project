const test = require('tape');
const runDbBuild = require('../../db_build');
const { setBook } = require('../set_book');
const { setCategory } = require('../set_category');
const { getCategory } = require('../get_category');
const { getLibraryBooks, getStoreBooks, getBorrowBooks } = require('../view_book');
const getAdmin = require('../checkAdmin');
const { setLibraryBook } = require('../set_libraryBook');
const { getSingleBookByLibraryId } = require('../get_single_book_by_library_id');
const { getUsers } = require('../view_user');
const { setStoreBook } = require('../set_storeBook');

test('Test for the getCategory function', (t) => {
  runDbBuild('db_bulid.sql', (err, res) => {
    t.notOk(err);
    return runDbBuild('fake_data.sql', () => {
      getCategory()
        .then((response) => {
          t.equal(response.length === 3, true, 'getCategory returns  successfully ');
          t.equal(response.length > 0, true, 'getCategory returns data successfully ');
          t.equal(response[0].name === 'أطفال', true, 'getCategory returns name أطفال ');
          t.equal(response[0].categorySerial === '501', true, 'getCategory returns categorySerial 501 ');
          t.end();
        })
        .catch(error => t.error(error));
    });
  });
});

test('Test for the setBook function', (t) => {
  runDbBuild('db_bulid.sql', (err, res) => {
    t.notOk(err);
    return runDbBuild('fake_data.sql', () => {
      const data = {
        nameBookVal: 'يوسف يامريم', nameAuthorVal: 'يامى أحمد', imageBookVal: '', descriptionVal: 'يوسف يامريم', categorySerial: '503',
      };
      setBook(data)
        .then((response) => {
          t.equal(response[0].id === 7, true, 'setBook returns data successfully ');
          t.equal(response[0].categorySerial === '503', true, 'setBook returns data successfully ');
          t.equal(response.length > 0, true, 'setBook returns data successfully ');
          t.end();
        })
        .catch(error => t.error(error));
    });
  });
});

test('Test for the setCategory function', (t) => {
  runDbBuild('db_bulid.sql', (err, res) => {
    t.notOk(err);
    return runDbBuild('fake_data.sql', () => {
      const data = { nameCategoryVal: 'جغرافيا', serialNumberVal: '511' };
      getCategory()
        .then((oldResponse) => {
          const oldCategoriesNumber = oldResponse.length;
          setCategory(data)
            .then((results) => {
              getCategory()
                .then((newResponse) => {
                  const newCategoriesNumber = newResponse.length;
                  t.equal(newCategoriesNumber - oldCategoriesNumber, 1, 'setCategory returns data successfully ');
                  t.end();
                });
            })
            .catch(error => t.error(error));
        });
    });
  });
});

test('Test getLibraryBooks', (t) => {
  runDbBuild('db_bulid.sql', (err, res) => {
    t.notOk(err);
    return runDbBuild('fake_data.sql', () => {
      getLibraryBooks()
        .then((response) => {
          t.equal(response.length, 6, 'successfully');
          t.equal(response[0].idLibrary, 1, 'LibraryBooks returns 1 ');
          t.equal(response[0].nameBook, 'ليلى الحمقاء', 'LibraryBooks returns \'ليلى الحمقاء\' ');
          t.equal(response[1].nameAuthor, 'أحلام كمال', 'LibraryBooks returns 1 ');
          t.equal(response[2].category, '503', 'LibraryBooks returns \'503\' ');
          t.equal(response[5].caseBook, 0, 'LibraryBooks returns 0 ');
          t.end();
        })
        .catch(error => t.error(error));
    });
  });
});

test('Test for the getAdmin function', (t) => {
  runDbBuild('db_bulid.sql', (err, res) => runDbBuild('fake_data.sql', () => {
    getAdmin('admin', (error, result) => {
      if (error) {
        t.error(error);
      }
      t.equal(result[0].id, 1, 'should return id = 1 ');
      t.equal(result[0].user_name, 'admin', 'should return the username');
      t.end();
    });
  }));
});

test('Test for the setLibraryBook function', (t) => {
  runDbBuild('db_bulid.sql', (err, res) => {
    t.notOk(err);
    return runDbBuild('fake_data.sql', () => {
      const data = {
        bookId: 2,
        bookshelfVal: 2,
        sectionVal: 2,
        copyId: 3,
      };
      setLibraryBook(data)
        .then((response) => {
          t.equal(response[0].bookshelf === 2, true, 'setLibraryBook returns data successfully ');
          t.equal(response[0].bookId === 2, true, 'setLibraryBook returns data successfully ');
          t.equal(response.length > 0, true, 'setLibraryBook returns data successfully ');
          t.end();
        })
        .catch(error => t.error(error));
    });
  });
});

test('Test for the setStoreBook function', (t) => {
  runDbBuild('db_bulid.sql', (err, res) => {
    t.notOk(err);
    return runDbBuild('fake_data.sql', () => {
      const data = {
        bookId: 4,
        copyNumberVal: 10,
      };
      setStoreBook(data)
        .then((response) => {
          t.equal(response[0].copyNumber === 10, true, 'setStoreBook returns data successfully ');
          t.equal(response[0].bookId === 4, true, 'setStoreBook returns data successfully ');
          t.end();
        })
        .catch(error => t.error(error));
    });
  });
});

test('Test getStoreBooks', (t) => {
  runDbBuild('db_bulid.sql', (err, res) => {
    t.notOk(err);
    return runDbBuild('fake_data.sql', () => {
      getStoreBooks()
        .then((response) => {
          t.equal(response.length, 4, 'successfully');
          t.equal(response[0].idStore, 1, 'StoreBooks returns 1 ');
          t.equal(response[1].nameBook, 'مذكرات أطفال البحر', 'StoreBooks returns \'مذكرات أطفال البحر\' ');
          t.equal(response[0].copyNumber, 10, 'StoreBooks returns 10 ');
          t.equal(response[1].copyNumber, 20, 'StoreBooks returns 20 ');
          t.equal(response[2].copyNumber, 30, 'StoreBooks returns 30 ');
          t.equal(response[3].copyNumber, 40, 'StoreBooks returns 40 ');
          t.end();
        })
        .catch(error => t.error(error));
    });
  });
});

test('Test getBorrowBooks', (t) => {
  runDbBuild('db_bulid.sql', (err, res) => {
    t.notOk(err);
    return runDbBuild('fake_data.sql', () => {
      getBorrowBooks()
        .then((response) => {
          t.equal(response.length, 4, 'successfully');
          t.equal(response[0].nameUser, 'علي', 'StoreBooks returns \'علي\' ');
          t.equal(response[1].nameBook, 'قلبي غابة', 'StoreBooks returns \'قلبي غابة\' ');
          t.equal(response[2].startDate, '2018-09-20', 'StoreBooks returns 2018-09-20');
          t.equal(response[3].endDate, '2018-09-25', 'StoreBooks returns 2018-09-25 ');
          t.end();
        })
        .catch(error => t.error(error));
    });
  });
});

test('Test getUsers', (t) => {
  runDbBuild('db_bulid.sql', (err, res) => {
    t.notOk(err);
    return runDbBuild('fake_data.sql', () => {
      getUsers()
        .then((response) => {
          t.equal(response.length, 3, 'getUsers length returns 3 ');
          t.equal(response[0].nameUser, 'أسماء', 'getUsers returns \'أسماء\' ');
          t.equal(response[1].address, 'الوسطى', 'getUsers returns \'الوسطى\'');
          t.equal(response[2].mobileNumber, '0599778899', 'getUsers returns \'0599778899\'');
          t.end();
        })
        .catch(error => t.error(error));
    });
  });
});


test('Test getSingleBookByLibraryId', (t) => {
  runDbBuild('db_bulid.sql', (err, res) => {
    t.notOk(err);
    return runDbBuild('fake_data.sql', () => {
      const data = {
        libraryId: 2,
      };
      getSingleBookByLibraryId(data)
        .then((response) => {
          t.equal(response[0].nameBook, 'سرير جدي', 'nameBook returns \'سرير جدي\' ');
          t.equal(response[0].nameAuthor, 'أحلام كمال', 'nameAuthor returns \'أحلام كمال\' ');
          t.equal(response[0].categorySerial, '502', 'category returns \'502\' ');
          t.equal(response[0].section, 10, 'section returns 10 ');
          t.end();
        })
        .catch(error => t.error(error));
    });
  });
});

test.onFinish(() => { process.exit(0); });

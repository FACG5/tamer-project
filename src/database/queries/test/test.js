const test = require('tape');
const runDbBuild = require('../../db_build');
const { setBook } = require('../set_book');
const { setCategory } = require('../set_category');
const { getCategory } = require('../get_category');
const { setLibraryBook } = require('../set_libraryBook');

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
          t.equal(typeof response, 'object', 'setBook returns data successfully ');
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

test('Test for the setLibraryBook function', (t) => {
  runDbBuild('db_bulid.sql', (err, res) => {
    t.notOk(err);
    return runDbBuild('fake_data.sql', () => {
      const data = {
        bookId: 2,
        bookshelfVal: 2,
        sectionVal: 2,
        copyIdVal: 3,
      };
      setLibraryBook(data)
        .then((response) => {
          t.equal(response[0].bookshelf === 2, true, 'setLibraryBook returns data successfully ');
          t.equal(response[0].bookId === 2, true, 'setLibraryBook returns data successfully ');
          t.equal(response.length > 0, true, 'setLibraryBook returns data successfully ');
          t.equal(typeof response, 'object', 'setLibraryBook returns data successfully ');
          t.end();
        })
        .catch(error => t.error(error));
    });
  });
});

test.onFinish(() => { process.exit(0); });

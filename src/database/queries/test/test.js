const test = require('tape');
const runDbBuild = require('../../db_build');
const { setBook } = require('../set_book');
const { setCategory } = require('../set_category');
const { getCategory } = require('../get_category');
const { getLibraryBooks } = require('../view_book');
const getAdmin = require('../checkAdmin');

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

test('Test getLibraryBooks', (t) => {
  runDbBuild('db_bulid.sql', (err, res) => {
    t.notOk(err);
    return runDbBuild('fake_data.sql', () => {
      getLibraryBooks()
        .then((response) => {
          t.equal(response.length, 4, 'successfully');
          t.equal(response[0].idLibrary, 1, 'LibraryBooks returns 1 ');
          t.equal(response[0].nameBook, 'ليلى الحمقاء', 'LibraryBooks returns \'ليلى الحمقاء\' ');
          t.equal(response[1].nameAuthor, 'أحلام كمال', 'LibraryBooks returns 1 ');
          t.equal(response[2].category, '503', 'LibraryBooks returns \'503\' ');
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

test.onFinish(() => { process.exit(0); });

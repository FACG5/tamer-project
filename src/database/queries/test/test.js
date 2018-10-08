const test = require('tape');
const runDbBuild = require('../../db_build');
const { getLibraryBooks } = require('../book');


test('Test getLibraryBooks', (t) => {
  runDbBuild('db_bulid.sql', (err, res) => {
    t.notOk(err);
    return runDbBuild('fake_data.sql', () => {
      getLibraryBooks()
        .then((response) => {
          t.equal(response.length > 0, true, 'successfully');
          t.equal(response[0].idLibrary, 1, 'LibraryBooks returns 1 ');
          t.end();
        })
        .catch(error => t.error(error));
    });
  });
});

test.onFinish(() => {
  process.exit(0);
});

const test = require('tape');
const runDbBuild = require('../../db_build');
const getAdmin = require('../checkAdmin');

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

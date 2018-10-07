const test = require('tape');
const supertest = require('supertest');
const app = require('../src/app');
const runDbBuild = require('../src/database/db_build');
const { setBook } = require('../src/database/queries/set_book');
const { setCategory } = require('../src/database/queries/set_category');
const { getCategory } = require('../src/database/queries/get_category');

test('Home route with get method returns a status code of 200 ', (t) => {
  supertest(app)
    .get('/admin/login')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.text.includes('<title>تسجيل الدخول</title>'), true, 'the page should have title \'تسجيل الدخول\'');
      t.equal(res.text.includes('<section class="content">'), true, 'the page should have content class');
      t.end();
    });
});

test('test for home page route ', (t) => {
  supertest(app)
    .get('/admin/')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.text.includes('<title>الرئيسية</title>'), true, 'the page should have title \'الرئيسية\'');
      t.end();
    });
});


test('test for book page route ', (t) => {
  supertest(app)
    .get('/admin/books/add/')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.text.includes('<title>الكتب</title>'), true, 'the page should have title \'الكتب\'');
      t.end();
    });
});

test('Test for the getCategory function', (t) => {
  runDbBuild('db_bulid.sql', (err, res) => {
    t.notOk(err);
    return runDbBuild('fake_data.sql', () => {
      getCategory()
        .then((response) => {
          t.equal(response.length > 0, true, 'getCategory returns data successfully ');
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
          t.equal(typeof response, 'object', 'setBook returns data successfully ');
        })
        .catch(error => t.error(error));
      t.end();
    });
  });
});

test('Test for the setCategory function', (t) => {
  runDbBuild('db_bulid.sql', (err, res) => {
    t.notOk(err);
    return runDbBuild('fake_data.sql', () => {
      const data = { nameCategoryVal: 'تاريخ', serialNumberVal: '507' };
      setCategory(data)
        .then((response) => {
          t.equal(typeof response, 'object', 'setCategory returns data successfully ');
        })
        .catch(error => t.error(error));
      t.end();
    });
  });
});

test.onFinish(() => { process.exit(0); });

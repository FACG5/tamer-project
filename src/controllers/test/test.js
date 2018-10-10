const test = require('tape');
const supertest = require('supertest');
const app = require('../../app');

// Admin login
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

test('test for home page route - without cookie and auth', (t) => {
  supertest(app)
    .get('/admin/')
    .expect(302)
    .expect('Content-Type', /text/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.header.location, '/admin/login', 'should return the redirect location "/admin/login"');
      t.equal(res.res.statusMessage, 'Found', 'statusMessage should return Found');
      t.end();
    });
});

test('test for home page route - with cookie and auth ', (t) => {
  supertest(app)
    .get('/admin/')
    .expect(200)
    .expect('Content-Type', /html/)
    .set('Cookie', ['data = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFkbWluIiwiaWF0IjoxNTM4OTExNzQxfQ.gQe7y4oF7wlL4oPAXdzMmNTwGlE2d69FyehJcOyiYLg'])
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.res.statusMessage, 'OK', 'statusMessage should return OK');
      t.equal(res.text.includes('<title>الرئيسية</title>'), true, 'the page should have title \'الرئيسية\'');
      t.end();
    });
});

test('test for borrowing section route - without cookie and auth', (t) => {
  supertest(app)
    .get('/admin/borrow')
    .expect(302)
    .expect('Content-Type', /text/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.header.location, '/admin/login', 'should return the redirect location "/admin/login"');
      t.equal(res.res.statusMessage, 'Found', 'statusMessage should return Found');
      t.end();
    });
});

test('test for borrowing section route - with cookie and auth ', (t) => {
  supertest(app)
    .get('/admin/borrow')
    .expect(200)
    .expect('Content-Type', /html/)
    .set('Cookie', ['data = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFkbWluIiwiaWF0IjoxNTM4OTExNzQxfQ.gQe7y4oF7wlL4oPAXdzMmNTwGlE2d69FyehJcOyiYLg'])
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.res.statusMessage, 'OK', 'statusMessage should return OK');
      t.equal(res.text.includes('<title>اﻹعارة</title>'), true, 'the page should have title \'اﻹعارة\'');
      t.end();
    });
});

// error pages tests
test('error page of status code of 404 ', (t) => {
  supertest(app)
    .get('/shsfgsgfh')
    .expect(404)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.res.statusMessage, 'Not Found', 'statusMessage should return Not Found');
      t.equal(res.clientError, true, 'should use clientError function and return true');
      t.equal(res.text.includes('<title>Error | 404</title>'), true, 'the page should have title \'Error | 404\'');
      t.end();
    });
});

// test website homepage
test('test for website landing page route ', (t) => {
  supertest(app)
    .get('/')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.res.statusMessage, 'OK', 'statusMessage should return OK');
      t.equal(res.text.includes('<title>الرئيسية</title>'), true, 'the page should have title \'الرئيسية\'');
      t.end();
    });
});

// tests for login page
test('test login post with correct password  ', (t) => {
  supertest(app)
    .post('/admin/login')
    .expect(200)
    .send({ passwordValue: 'password', usernameValue: 'admin' })
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.text.includes('"message":"Welcome"'), true, 'should return a welcome massage');
      t.end();
    });
});

test('test login post wrong password to login ', (t) => {
  supertest(app)
    .post('/admin/login')
    .expect(302)
    .send({ passwordValue: 'passw55ord', usernameValue: 'admin' })
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.text.includes('"Wrong Password !"'), true, 'should return a wrong password massage');
      t.end();
    });
});

// test book page
test('test for book page route - without cookie and auth', (t) => {
  supertest(app)
    .get('/admin/books/add/')
    .expect(302)
    .expect('Content-Type', /text/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.header.location, '/admin/login', 'should return the redirect location "/admin/login"');
      t.equal(res.res.statusMessage, 'Found', 'statusMessage should return Found');
      t.end();
    });
});

test('test for book page route - with cookie and auth ', (t) => {
  supertest(app)
    .get('/admin/books/add/')
    .expect(200)
    .expect('Content-Type', /html/)
    .set('Cookie', ['data = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFkbWluIiwiaWF0IjoxNTM4OTExNzQxfQ.gQe7y4oF7wlL4oPAXdzMmNTwGlE2d69FyehJcOyiYLg'])
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.res.statusMessage, 'OK', 'statusMessage should return OK');
      t.equal(res.text.includes('<title>الكتب</title>'), true, 'the page should have title \'الكتب\'');
      t.end();
    });
});

test('test for add book page route - without cookie and auth', (t) => {
  supertest(app)
    .post('/admin/books/')
    .expect(302)
    .expect('Content-Type', /text/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.header.location, '/admin/login', 'should return the redirect location "/admin/login"');
      t.equal(res.res.statusMessage, 'Found', 'statusMessage should return Found');
      t.end();
    });
});

test('test for add book page route - with cookie and auth ', (t) => {
  supertest(app)
    .post('/admin/books/')
    .expect(200)
    .expect('Content-Type', /html/)
    .set('Cookie', ['data = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFkbWluIiwiaWF0IjoxNTM4OTExNzQxfQ.gQe7y4oF7wlL4oPAXdzMmNTwGlE2d69FyehJcOyiYLg'])
    .send({
      nameBookVal: 'يوسف يامريم',
      nameAuthorVal: 'يامى أحمد',
      imageBookVal: '',
      descriptionVal: 'يوسف يامريم',
      categorySerial: '503',
    })
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.res.statusMessage, 'OK', 'statusMessage should return OK');
      t.end();
    });
});

test('test for add categery page route - without cookie and auth', (t) => {
  supertest(app)
    .post('/admin/books/category')
    .expect(302)
    .expect('Content-Type', /text/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.header.location, '/admin/login', 'should return the redirect location "/admin/login"');
      t.equal(res.res.statusMessage, 'Found', 'statusMessage should return Found');
      t.end();
    });
});

test('test for add categery page route - with cookie and auth ', (t) => {
  supertest(app)
    .post('/admin/books/category')
    .expect(200)
    .expect('Content-Type', /html/)
    .set('Cookie', ['data = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFkbWluIiwiaWF0IjoxNTM4OTExNzQxfQ.gQe7y4oF7wlL4oPAXdzMmNTwGlE2d69FyehJcOyiYLg'])
    .send({
      nameCategoryVal: 'تاريخ',
      serialNumberVal: '507',
    })
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.res.statusMessage, 'OK', 'statusMessage should return OK');
      t.equal(typeof res.body, 'object', 'add categery returns data successfully ');
      t.end();
    });
});

test('test for add bookLibrary page route  - without cookie and auth', (t) => {
  supertest(app)
    .post('/admin/books/1/library')
    .expect(302)
    .expect('Content-Type', /text/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.header.location, '/admin/login', 'should return the redirect location "/admin/login"');
      t.equal(res.res.statusMessage, 'Found', 'statusMessage should return Found');
      t.end();
    });
});

test('test for add bookLibrary page route  - with cookie and auth ', (t) => {
  supertest(app)
    .post('/admin/books/1/library')
    .set('Cookie', ['data = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFkbWluIiwiaWF0IjoxNTM4OTExNzQxfQ.gQe7y4oF7wlL4oPAXdzMmNTwGlE2d69FyehJcOyiYLg'])
    .send({
      bookId: 1,
      bookshelfVal: 5,
      sectionVal: 3,
      copyId: 1,
    })
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.res.statusMessage, 'OK', 'statusMessage should return OK');
      t.end();
    });
});

// library view page
test('test for add library view page route - with cookie and auth ', (t) => {
  supertest(app)
    .get('/admin/books/library')
    .expect(200)
    .expect('Content-Type', /html/)
    .set('Cookie', ['data = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFkbWluIiwiaWF0IjoxNTM4OTExNzQxfQ.gQe7y4oF7wlL4oPAXdzMmNTwGlE2d69FyehJcOyiYLg'])
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.res.statusMessage, 'OK', 'statusMessage should return OK');
      t.equal(res.text.includes('<title>عرض المكتبة</title>'), true, 'the page should have title \'الرئيسية\'');
      t.end();
    });
});

test('test for add bookstorpage route  - without cookie and auth', (t) => {
  supertest(app)
    .post('/admin/books/4/store')
    .expect(302)
    .expect('Content-Type', /text/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.header.location, '/admin/login', 'should return the redirect location "/admin/login"');
      t.equal(res.res.statusMessage, 'Found', 'statusMessage should return Found');
      t.end();
    });
});

test('test for add bookStore page route  - with cookie and auth ', (t) => {
  supertest(app)
    .post('/admin/books/4/store')
    .set('Cookie', ['data = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFkbWluIiwiaWF0IjoxNTM4OTExNzQxfQ.gQe7y4oF7wlL4oPAXdzMmNTwGlE2d69FyehJcOyiYLg'])
    .send({
      bookId: 4,
      copyNumberVal: 10,
    })
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(JSON.parse(res.text).message, 'storeBook Added !', 'Message should return storeBook Added !');
      t.end();
    });
});

test('test for borrowed view page route ', (t) => {
  supertest(app)
    .get('/admin/books/borrowed')
    .expect(200)
    .expect('Content-Type', /html/)
    .set('Cookie', ['data = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFkbWluIiwiaWF0IjoxNTM4OTExNzQxfQ.gQe7y4oF7wlL4oPAXdzMmNTwGlE2d69FyehJcOyiYLg'])
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.res.statusMessage, 'OK', 'statusMessage should return OK');
      t.equal(res.text.includes('<title>عرض المستعار</title>'), true, 'the page should have title \'عرض المستعار\'');
      t.end();
    });
});

// store view page
test('test for store view page route - with cookie and auth ', (t) => {
  supertest(app)
    .get('/admin/books/store')
    .expect(200)
    .expect('Content-Type', /html/)
    .set('Cookie', ['data = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFkbWluIiwiaWF0IjoxNTM4OTExNzQxfQ.gQe7y4oF7wlL4oPAXdzMmNTwGlE2d69FyehJcOyiYLg'])
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.res.statusMessage, 'OK', 'statusMessage should return OK');
      t.equal(res.text.includes('<title>عرض المخزن</title>'), true, 'the page should have title \'عرض المخزن\'');
      t.end();
    });
});

// users view page
test('test for users view page route - with cookie and auth ', (t) => {
  supertest(app)
    .get('/admin/users')
    .expect(200)
    .expect('Content-Type', /html/)
    .set('Cookie', ['data = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFkbWluIiwiaWF0IjoxNTM4OTExNzQxfQ.gQe7y4oF7wlL4oPAXdzMmNTwGlE2d69FyehJcOyiYLg'])
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.res.statusMessage, 'OK', 'statusMessage should return OK');
      t.equal(res.text.includes('<title>اﻷعضاء</title>'), true, 'the page should have title \'الأعضاء\'');
      t.end();
    });
});

// borrower view page
test('test for users view page route - with cookie and auth ', (t) => {
  supertest(app)
    .get('/admin/users/borrower')
    .expect(200)
    .expect('Content-Type', /html/)
    .set('Cookie', ['data = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFkbWluIiwiaWF0IjoxNTM4OTExNzQxfQ.gQe7y4oF7wlL4oPAXdzMmNTwGlE2d69FyehJcOyiYLg'])
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.text.includes('<title>المستعيرين</title>'), true, 'the page should have title \'المستعيرين\'');
      t.end();
    });
});

// test for single library book
test('test for single library book - with cookie and auth ', (t) => {
  supertest(app)
    .get('/admin/books/library/book/1')
    .expect(200)
    .expect('Content-Type', /html/)
    .set('Cookie', ['data = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFkbWluIiwiaWF0IjoxNTM4OTExNzQxfQ.gQe7y4oF7wlL4oPAXdzMmNTwGlE2d69FyehJcOyiYLg'])
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.text.includes('<title>عرض كتاب</title>'), true, 'the page should have title \'عرض كتاب\'');
      t.end();
    });
});

// test for single store book
test('test for single store book - with cookie and auth ', (t) => {
  supertest(app)
    .get('/admin/books/store/book/4')
    .expect(200)
    .expect('Content-Type', /html/)
    .set('Cookie', ['data = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFkbWluIiwiaWF0IjoxNTM4OTExNzQxfQ.gQe7y4oF7wlL4oPAXdzMmNTwGlE2d69FyehJcOyiYLg'])
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.text.includes('<title>عرض كتاب</title>'), true, 'the page should have title \'عرض كتاب\'');
      t.end();
    });
});

test('test for add borrowpage route  - without cookie and auth', (t) => {
  supertest(app)
    .post('/admin/borrow/')
    .expect(302)
    .expect('Content-Type', /text/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.header.location, '/admin/login', 'should return the redirect location "/admin/login"');
      t.equal(res.res.statusMessage, 'Found', 'statusMessage should return Found');
      t.end();
    });
});

test('test for add borrowpage page route  - with cookie and auth ', (t) => {
  supertest(app)
    .post('/admin/borrow/')
    .set('Cookie', ['data = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFkbWluIiwiaWF0IjoxNTM4OTExNzQxfQ.gQe7y4oF7wlL4oPAXdzMmNTwGlE2d69FyehJcOyiYLg'])
    .send({
      mobileNumberVal: '0599112233',
    })
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.res.statusMessage, 'OK', 'statusMessage should return OK');
      t.end();
    });
});

// test for delete library book
test('test for delete library book - with cookie and auth ', (t) => {
  supertest(app)
    .delete('/admin/books/library/1')
    .expect(200)
    .expect('Content-Type', /json/)
    .set('Cookie', ['data = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFkbWluIiwiaWF0IjoxNTM4OTExNzQxfQ.gQe7y4oF7wlL4oPAXdzMmNTwGlE2d69FyehJcOyiYLg'])
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.res.statusMessage, 'OK', 'statusMessage should return OK');
      t.end();
    });
});

test('test for add borrowpage page route  - with cookie and auth ', (t) => {
  supertest(app)
    .post('/admin/borrow/')
    .set('Cookie', ['data = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFkbWluIiwiaWF0IjoxNTM4OTExNzQxfQ.gQe7y4oF7wlL4oPAXdzMmNTwGlE2d69FyehJcOyiYLg'])
    .send({
      mobileNumberVal: '0599112233',
    })
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      const response = JSON.parse(res.text);
      t.equal(response.resultUser[0].userId, 1, 'id should return 1');
      t.equal(response.resultUser[0].name, 'أسماء', 'name should return أسماء');
      t.equal(response.resultUser[0].address, 'غزة - النصر', 'address returns \' غزة - النصر\' ');
      t.equal(response.resultBorrowedBooksByUserId[0].nameBook, 'ليلى الحمقاء', 'name returns \'ليلى الحمقاء\' ');
      t.equal(response.resultBorrowedBooksByUserId[0].endDate, '2018-09-25', 'endDate returns \'2018-09-25\' ');
      t.equal(response.resultBorrowedBooksByUserId[0].serialNumber, '501.1.5.2', 'serialNumber returns \'501.1.5.2\' ');
      t.equal(response.resultBorrowedBooksByUserId[0].idBorrow, 1, 'section returns idBorrow ');
      t.end();
    });
});

test('test for add User  route - without cookie and auth', (t) => {
  supertest(app)
    .post('/admin/user/')
    .expect(302)
    .expect('Content-Type', /text/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.header.location, '/admin/login', 'should return the redirect location "/admin/login"');
      t.equal(res.res.statusMessage, 'Found', 'statusMessage should return Found');
      t.end();
    });
});

test('test for add user page route  - with cookie and auth ', (t) => {
  supertest(app)
    .post('/admin/user/')
    .set('Cookie', ['data = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFkbWluIiwiaWF0IjoxNTM4OTExNzQxfQ.gQe7y4oF7wlL4oPAXdzMmNTwGlE2d69FyehJcOyiYLg'])
    .send({
      nameUserVal: 'محمد',
      mobileNumberUserVal: '0597346023',
      addressVal: 'غزة',
    })
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, response) => {
      if (err) {
        t.error(err);
      }
      t.equal(JSON.parse(response.text).message, 'User Added !', 'Message should return User Added !');
      t.end();
    });
});

test.onFinish(() => { process.exit(0); });

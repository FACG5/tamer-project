const test = require('tape');
const supertest = require('supertest');
const app = require('./../src/app.js');

test('test for home page route ', (t) => {
  supertest(app)
    .get('/admin/')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.end();
    });
});

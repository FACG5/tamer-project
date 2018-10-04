const express = require('express');
const user = require('./user');
const books = require('./books');
const borrow = require('./borrow');
const borrowedUsers = require('./borrowed_users');
const adminHomePage = require('./admin_homePage.js');

const router = express.Router();

router.get('/admin/', adminHomePage.get);
router.get('/admin/users', user.get);
router.get('/admin/borrowedUsers', borrowedUsers.get);
router.get('/admin/books', books.get);
router.get('/admin/borrow', borrow.get);

module.exports = router;

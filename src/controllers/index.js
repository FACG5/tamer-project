const express = require('express');
const user = require('./user.js');
const login = require('./login');
const books = require('./books');
const adminHomePage = require('./admin_homePage.js');

const router = express.Router();

router.get('/admin/login', login.get);
router.get('/admin/', adminHomePage.get);
router.get('/admin/users', user.getViewUser);
router.get('/admin/borrowedUsers', user.getBorrowedUser);
router.get('/admin/books/library', books.getLibraryBooks);
router.get('/admin/books/store', books.getStoreBooks);
router.get('/admin/books/borrowedBooks', books.getBorrowedBooks);
router.get('/admin/books/addBook', books.getAddBookTab);

module.exports = router;

/* 
/admin/books/library
/admin/books/store
/admin/books/borrowedBooks
/admin/books/addBook
*/
const express = require('express');
const user = require('./user.js');
const login = require('./login');
const books = require('./books');
const adminHomePage = require('./admin_homePage.js');
const logout = require('./logout');
const { isLoggedIn } = require('./isLoggedIn');

const router = express.Router();

router.get('/admin/login', login.get);
router.post('/admin/login', login.post);
router.get('/admin/logout', isLoggedIn, logout.get);

router.get('/admin/', isLoggedIn, adminHomePage.get);
router.get('/admin/users', isLoggedIn, user.getViewUser);
router.get('/admin/users/borrower', isLoggedIn, user.getBorrowedUser);
router.get('/admin/books/library', isLoggedIn, books.getLibraryBooks);
router.get('/admin/books/store', isLoggedIn, books.getStoreBooks);
router.get('/admin/books/borrowed', isLoggedIn, books.getBorrowedBooks);
router.get('/admin/books/add', isLoggedIn, books.getAddBookTab);

module.exports = router;

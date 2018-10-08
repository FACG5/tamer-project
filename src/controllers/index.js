const express = require('express');
const user = require('./user.js');
const login = require('./login');
const books = require('./books');
const borrow = require('./borrow');
const adminHomePage = require('./admin_homePage.js');
const logout = require('./logout');
const { isLoggedIn } = require('./isLoggedIn');
const websiteHomePage = require('./website_homepage');
const error = require('./error');

const router = express.Router();

// website homepage route
router.get('/', websiteHomePage.get);

// admin login routes
router.get('/admin/login', login.get);
router.post('/admin/login', login.post);

// admin control panel routes
router.get('/admin/logout', isLoggedIn, logout.get);
router.get('/admin/', isLoggedIn, adminHomePage.get);
router.get('/admin/users', isLoggedIn, user.getViewUser);
router.get('/admin/users/borrower', isLoggedIn, user.getBorrowedUser);
router.get('/admin/books/library', isLoggedIn, books.getLibraryBooks);
router.get('/admin/books/store', isLoggedIn, books.getStoreBooks);
router.get('/admin/books/borrowed', isLoggedIn, books.getBorrowedBooks);
router.get('/admin/books/add', isLoggedIn, books.getAddBookTab);
router.post('/admin/books/category', books.addCategory);
router.post('/admin/books/', books.addBook);
router.get('/admin/borrow', isLoggedIn, borrow.get);

router.use(error.client);
router.use(error.server);

module.exports = router;

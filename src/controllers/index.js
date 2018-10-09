const express = require('express');
const user = require('./user.js');
const login = require('./login');
const books = require('./books');
const borrow = require('./borrow');
const adminHomePage = require('./admin_homePage.js');
const logout = require('./logout');
const { isLoggedIn } = require('./is_logged_in.js');
const websiteHomePage = require('./website_homepage');
const error = require('./error');
const singleBook = require('./single_book');

const router = express.Router();

// unsecure routes
router.get('/', websiteHomePage.get);
router.get('/admin/login', login.get);
router.post('/admin/login', login.post);

// secure routes
router.use('/admin', isLoggedIn);

// admin control panel routes
router.get('/admin/logout', logout.get);
router.get('/admin/', adminHomePage.get);
router.get('/admin/users', user.getViewUser);
router.get('/admin/users/borrower', user.getBorrowedUser);
router.get('/admin/books/library', books.getLibraryBooks);
router.get('/admin/books/store', books.getStoreBooks);
router.get('/admin/books/borrowed', books.getBorrowedBooks);
router.get('/admin/books/add', books.getAddBookTab);
router.get('/admin/borrow', borrow.get);
router.post('/admin/books/category', books.addCategory);
router.post('/admin/books/', books.addBook);
router.post('/admin/books/:bookId/library', books.addLibraryBook);
router.post('/admin/books/:bookId/store', books.addStoreBook);
router.get('/admin/books/library/book/:libraryId', singleBook.getSingleLibraryBook);

router.use(error.client);
router.use(error.server);

module.exports = router;

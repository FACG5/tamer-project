const express = require('express');
const adminHomePage = require('./admin_homePage.js');
const user = require('./user.js');
const login = require('./login');

const router = express.Router();

router.get('/admin/login', login.get);
router.get('/admin/', adminHomePage.get);
router.get('/admin/users', user.getViewUser);
router.get('/admin/borrowedUsers', user.getBorrowedUser);

module.exports = router;

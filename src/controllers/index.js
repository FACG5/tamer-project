const express = require('express');
const adminHomePage = require('./admin_homePage.js');

const router = express.Router();

router.get('/admin/', adminHomePage.get);

module.exports = router;

const express = require('express');

const router = express.Router();

const login = require('./login');

router.get('/admin/login', login.get);

module.exports = router;

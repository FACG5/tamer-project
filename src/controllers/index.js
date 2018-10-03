const express = require('express');
const login = require('./login');

const router = express.Router();

router.get('/admin/login', login.get);

module.exports = router;

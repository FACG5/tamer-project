const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.disable('x-powered-by');

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, '..', 'public')));

module.exports = app;

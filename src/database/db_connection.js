const { Pool } = require('pg');
const url = require('url');
require('env2')('./config.env');

let dbUrl = '';

if (process.env.NODE_ENV === 'test') {
  dbUrl = process.env.TEST_DB_URL;
} else {
  dbUrl = process.env.DB_URL;
}

if (!dbUrl) throw new Error('Can not found the DB_URL!');

const params = url.parse(dbUrl);
const [username, password] = params.auth.split(':');

const options = {
  host: params.hostname,
  port: params.port,
  user: username,
  password,
  database: params.pathname.split('/')[1],
  max: process.env.MAX_DB_CONNECTIONS || 2,
  ssl: process.env.host !== 'localhost',
};

module.exports = new Pool(options);

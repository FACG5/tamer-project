const fs = require('fs');
const path = require('path');
const dbConnection = require('./db_connection');

const dbBuild = (fileName, cb) => {
  const sql = fs.readFileSync(path.join(__dirname, fileName)).toString();
  dbConnection.query(sql, (err, res) => {
    if (err) return cb(err);
    return cb(null, res);
  });
};

module.exports = dbBuild;

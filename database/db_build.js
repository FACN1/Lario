const fs = require('fs');

const dbConnection = require('./db_connection.js');

const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

dbConnection.query(sql, (error, res) => {
  if (error) {
    console.log(error);
    return error;
  }
  return console.log('Kitty table created with result:', res);
});

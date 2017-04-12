const dbQueries = require('../db_queries.js');
const connPool = require('../../database/db_connection.js');

const NUM_OF_RESULTS = 50;

const homeHandler = (request, reply) => {
  dbQueries.retrieveTransactions(connPool, (err, response) => {
    // Sum the transactions in the kitty
    const kittyTotal = response.rows.reduce((transactionSum, row) =>
    (transactionSum + row.transaction_value), 0);

    const data = {
      title: 'Kitty I/O',
      total: kittyTotal,
      rows: response.rows.slice(0, NUM_OF_RESULTS)
    };
    reply.view('home', data);
  });
};

module.exports = {
  method: 'GET',
  path: '/home',
  config: {
    auth: 'jwt'
  },
  handler: homeHandler
};

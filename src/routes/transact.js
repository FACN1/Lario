const connPool = require('../../database/db_connection.js');
const dbQueries = require('../db_queries.js');

const transactionHandler = (request, reply) => {
  dbQueries.postTransaction(connPool, request.payload, (err) => {
    if (err) {
      reply(`error when adding to database: ${err}`);
    }
    reply.redirect('/home');
  });
};

module.exports = {
  method: 'POST',
  path: '/transact',
  config: {
    auth: 'jwt'
  },
  handler: transactionHandler
};

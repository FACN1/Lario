const joi = require('joi');

const dbQueries = {};

dbQueries.postTransaction = (connPool, data, callback) => {
  const schema = joi.object({
    name: joi.string().regex(/^[a-zA-Z]{3,40}$/),
    amount: joi.number().integer()
  });

  joi.validate({ name: data.name, amount: data.amount }, schema, (err, validated) => {
    if (err) {
      callback('Invalid Data');
      return;
    }

    connPool.query(
      'INSERT INTO kitty (name, transaction_value) VALUES ($1, $2)',
      [validated.name, validated.amount],
      callback
    );
  });
};

dbQueries.retrieveTransactions = (connPool, callback) => {
  connPool.query(
    'SELECT name, transaction_value, transaction_date FROM kitty ORDER BY transaction_date DESC',
    callback
  );
};

module.exports = dbQueries;

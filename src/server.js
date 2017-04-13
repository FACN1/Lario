const hapi = require('hapi');
const inert = require('inert');
const vision = require('vision');
const path = require('path');
const handlebars = require('handlebars');
const jwt = require('hapi-auth-jwt2');
const routes = require('./routes');

const server = new hapi.Server({
  connections: {
    state: {
      isSameSite: 'Lax'
    }
  }
});

const validate = (token, request, callback) => {
  if (!token) {
    return callback(null, false);
  }
  return callback(null, true);
};

server.connection({
  port: process.env.PORT || 9000
});

server.register([inert, vision, jwt], (err) => {
  if (err) throw err;

  server.auth.strategy('jwt', 'jwt', {
    key: process.env.SECRET,
    validateFunc: validate,
    verifyOptions: { algorithms: ['HS256'] }
  });
  server.route(routes);

  server.views({
    engines: {
      hbs: handlebars
    },
    relativeTo: path.join(__dirname, 'handlebars'),
    layoutPath: './layouts',
    layout: 'default',
    path: './views',
    partialsPath: './partials',
    helpersPath: './helpers'
  });
});

module.exports = server;

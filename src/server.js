const hapi = require('hapi');
const inert = require('inert');
const vision = require('vision');
const path = require('path');
const handlebars = require('handlebars');
const routes = require('./routes');

const server = new hapi.Server();

server.connection({
  port: process.env.PORT || 9000
});

server.register([inert, vision], (err) => {
  if (err) throw err;
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

const tape = require('tape');
const server = require('../../src/server.js');

server.start();
tape('check the home route', (t) => {
  server.inject({ url: '/', method: 'GET' }, (rep) => {
    t.equal(rep.statusCode, 200, 'status code is 200 ');
    t.ok(rep.payload, 'payload has data in it');
    t.end();
  });
});

tape('check the form route', (t) => {
  server.inject({ url: '/form', method: 'GET' }, (rep) => {
    t.equal(rep.statusCode, 200, 'statuscode in form route is 200');
    t.end();
  });
});


tape.onFinish(() => process.exit(0));

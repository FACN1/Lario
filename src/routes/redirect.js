const queryString = require('querystring');
require('env2')('./config.env');


const redirectHandler = (request, reply) => {
  const tokenURL = queryString.stringify({
    client_id: process.env.CLIENT_ID,
    redirect_uri: 'http://localhost:9000/temp'
  });
  reply.redirect(`https://github.com/login/oauth/authorize?${tokenURL}`);
};


module.exports = {
  method: 'GET',
  path: '/redirect',
  handler: redirectHandler
};

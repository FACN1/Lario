const logoutHandler = (request, reply) => {
  reply.redirect('/').unstate('token');
};

module.exports = {
  method: 'GET',
  path: '/logout',
  handler: logoutHandler
};

const formHandler = (request, reply) => {
  reply.view('form', {
    title: 'Update',
    username: request.auth.credentials.user.username,
    avatar_url: request.auth.credentials.user.img_url
  });
};

module.exports = {
  method: 'GET',
  path: '/form',
  config: {
    auth: 'jwt'
  },
  handler: formHandler
};

const formHandler = (request, reply) => {
  reply.view('form', {
    title: 'Update'
  });
};

module.exports = {
  method: 'GET',
  path: '/form',
  handler: formHandler
};

const staticFiles = require('./static.js');
const form = require('./form.js');
const transact = require('./transact.js');
const home = require('./home.js');
const login = require('./login.js');


module.exports = [
  staticFiles,
  form,
  transact,
  home,
  login
];

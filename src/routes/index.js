const staticFiles = require('./static.js');
const form = require('./form.js');
const transact = require('./transact.js');
const home = require('./home.js');
const login = require('./login.js');
const redirect = require('./redirect.js');
const temp = require('./temp.js');
const logout = require('./logout.js');


module.exports = [
  staticFiles,
  form,
  transact,
  home,
  login,
  redirect,
  temp,
  logout
];

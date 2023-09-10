const routerAuth = require('express').Router(); // создали роутер
const {
  login,
} = require('../controllers/users');
const {
  userAuthValidation,
} = require('../utils/validation');

routerAuth.post('/', userAuthValidation, login); // авторизация

module.exports = routerAuth;

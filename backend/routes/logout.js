const routerLogout = require('express').Router(); // создали роутер
const {
  logout,
} = require('../controllers/users');

routerLogout.get('/', logout); // выход

module.exports = routerLogout;

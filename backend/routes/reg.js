const routerReg = require('express').Router(); // создали роутер
const {
  createUser,
} = require('../controllers/users');
const {
  userCreateValidation,
} = require('../utils/validation');

routerReg.post('/', userCreateValidation, createUser); // регистрация

module.exports = routerReg;

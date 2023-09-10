const routerUsers = require('express').Router(); // создали роутер
// const path = require("path");
const {
  getUsers,
  getUserProfile,
  getByIdProfile,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');
const {
  userIdValidation,
  userDataValidation,
  userAvatarValidation,
} = require('../utils/validation');

routerUsers.get('/', getUsers);
routerUsers.get('/me', getUserProfile);
routerUsers.get('/:id', userIdValidation, getByIdProfile);
routerUsers.patch('/me', userDataValidation, updateProfile); // PATCH /users/me — обновляет профиль
routerUsers.patch('/me/avatar', userAvatarValidation, updateAvatar); // PATCH /users/me/avatar — обновляет аватар

module.exports = routerUsers;

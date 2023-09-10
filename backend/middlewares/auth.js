const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/unauthorized-err');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  // достаём токен
  const token = req.cookies.jwt;

  function checkToken(anyToken) {
    if (!anyToken) {
      return next(new UnauthorizedError('Токен не получен из куки. Необходима авторизация'));
    }

    try {
      return jwt.verify(anyToken, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    } catch (err) {
      return next(new UnauthorizedError('Токен не прошел верификацию. Необходима авторизация'));
    }
  }

  const payload = checkToken(token);

  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};

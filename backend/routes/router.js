const router = require('express').Router(); // создали роутер
const auth = require('../middlewares/auth');
const routerUsers = require('./users');
const routerCards = require('./cards');
const routerAuth = require('./auth');
const routerReg = require('./reg');
const routerLogout = require('./logout');
const NotFoundError = require('../errors/not-found-err');

router.use('/signup', routerReg);
router.use('/signin', routerAuth);
router.use('/users', auth, routerUsers);
router.use('/cards', auth, routerCards);
router.use('/signout', auth, routerLogout);
router.use('/crash-test', (req, res, next) => {
  setTimeout(() => {
    next(new Error('Сервер сейчас упадет'));
  }, 0);
});
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена.'));
});

module.exports = router;

const routerCards = require('express').Router(); // создали роутер
const {
  getCards,
  createCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
} = require('../controllers/cards');
const {
  cardDataValidation,
  cardIdValidation,
} = require('../utils/validation');

routerCards.get('/', getCards); // GET / cards — возвращает все карточки
routerCards.post('/', cardDataValidation, createCard); // POST /cards — создаёт карточку
routerCards.delete('/:cardId', cardIdValidation, deleteCard); // DELETE /cards/:cardId — удаляет карточку по идентификатору
routerCards.put('/:cardId/likes', cardIdValidation, addLikeCard); // PUT /cards/:cardId/likes — поставить лайк карточке
routerCards.delete('/:cardId/likes', cardIdValidation, deleteLikeCard); // DELETE /cards/:cardId/likes — убрать лайк с карточки

module.exports = routerCards;

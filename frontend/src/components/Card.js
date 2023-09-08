import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `button button-like ${isLiked && 'button-like_active'}`;
// console.log(isLiked)
// console.log(card.owner)
// console.log(currentUser._id)

  return (
    <li className="elements__list">
      <figure className="element">
        {isOwn && (
          <button className="button button-card-delete" onClick={() => onCardDelete(card)}>
            <div className="sr-only">Удалить</div>
          </button>
        )}
        <img
          className="element__image"
          src={card.link}
          alt={card.name}
          onClick={() => {
            onCardClick(card.name, card.link);
          }}
        />
        <figcaption className="element__caption">
          <p className="title element__title">{card.name}</p>
          <div className="element__like">
            <button
              className={cardLikeButtonClassName}
              onClick={() => {
                onCardLike(card);
              }}
            >
              <div className="sr-only">Поставить лайк</div>
            </button>
            <p className="text element__like-count">{card.likes.length}</p>
          </div>
        </figcaption>
      </figure>
    </li>
  );
}

export default Card;

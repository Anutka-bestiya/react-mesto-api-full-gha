import React from 'react';
import editPen from '../images/avatar-edit-button.svg';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile section">
        <div className="profile__avatar">
          <img src={currentUser.avatar} alt="Фото профиля" className="profile__image user-avatar" />
          <button className="profile__edit-image-button" onClick={onEditAvatar}>
            <img src={editPen} alt="Карандаш Редактировать" className="profile__edit-image" />
            <div className="sr-only">Редактировать</div>
          </button>
        </div>
        <h1 className="profile__name text user-name">{currentUser.name}</h1>
        <button
          className="button-edit button-open button profile__edit-button edit-popup-open"
          onClick={onEditProfile}
        >
          <div className="sr-only">Редактировать</div>
        </button>
        <p className="profile__about text user-about">{currentUser.about}</p>
        <button
          className="button-add button-open button profile__add-button add-card-popup-open"
          onClick={onAddPlace}
        >
          <div className="sr-only">Добавить</div>
        </button>
      </section>
      <section className="photo-galery section" aria-label="Галерея">
        <ul className="elements page__list">
          {cards.map(card => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;

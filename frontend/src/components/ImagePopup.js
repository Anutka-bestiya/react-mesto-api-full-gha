import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`popup image-popup ${card ? 'popup_opened' : ''} `}
      aria-label="Фото из галереи"
    >
      <figure className="image-popup__element popup__inactiv-close">
        <button className="button-close button image-popup__close-button" onClick={onClose}>
          <div className="sr-only">Закрыть</div>
        </button>
        <img
          className="image-popup__image"
          src={card ? card.link : '#'}
          alt={card ? card.name : 'Фото'}
        />
        <figcaption className="image-popup__element">
          <p className="image-popup__title">{card ? card.name : ''}</p>
        </figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;

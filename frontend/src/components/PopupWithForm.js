import React from 'react';
import { LoadingContext } from '../contexts/LoadingContext';

function PopupWithForm(props) {
  const isLoading = React.useContext(LoadingContext);

  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''} `}>
      <div className="popup__container popup__inactiv-close">
        <button className="button-close button" onClick={props.onClose}>
          <div className="sr-only">Закрыть</div>
        </button>
        <h2 className="title popup__title">{props.title}</h2>
        <form
          className={`popup__form form form_${props.name}`}
          noValidate
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            className="popup__button button text-button text"
            type="submit"
            value="Отправить форму сейчас"
          >
            {isLoading ? props.buttonTextProgress : props.buttonText}
            <div className="sr-only">{props.buttonText}</div>
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;

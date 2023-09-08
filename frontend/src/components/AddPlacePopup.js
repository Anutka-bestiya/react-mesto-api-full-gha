import React from 'react';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';
// import { LoadingContext } from '../contexts/LoadingContext';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onUpdateCard }) {
  //  const currentUser = React.useContext(CurrentUserContext);
  //  const isLoading = React.useContext(LoadingContext);
  const [name, setName] = React.useState({});
  const [link, setLink] = React.useState({});

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleNameAdd(e) {
    setName(e.target.value);
  }

  function handleLinkAdd(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateCard({
      name,
      link
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText="Создать"
      buttonTextProgress="Создание.."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input form__input text text_size_small add-card__text form-add-card-name"
        type="text"
        name="name"
        value={name}
        required
        minLength="2"
        maxLength="30"
        placeholder="Название"
        onChange={handleNameAdd}
      />
      <span className="popup__error popup__error-name"></span>
      <input
        className="popup__input form__input text text_size_small add-card__text form-add-card-link"
        type="url"
        name="link"
        value={link}
        required
        placeholder="https://site.com"
        onChange={handleLinkAdd}
      />
      <span className="popup__error popup__error-link"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;

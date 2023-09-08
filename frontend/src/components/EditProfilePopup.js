import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
//import { LoadingContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  //const isLoading = React.useContext(LoadingContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAboutChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      buttonTextProgress="Сохранение.."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      // ...props
    >
      <input
        className="popup__input form__input text text_size_small form-user-name"
        type="text"
        name="name"
        value={name}
        required
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        onChange={handleNameChange}
      />
      <span className="popup__error popup__error-name"></span>
      <input
        className="popup__input form__input text text_size_small form-user-about"
        type="text"
        name="about"
        value={description}
        required
        minLength="2"
        maxLength="200"
        placeholder="О себе"
        onChange={handleAboutChange}
      />
      <span className="popup__error popup__error-about"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;

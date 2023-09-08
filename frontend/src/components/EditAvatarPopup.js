import React from 'react';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';
// import { LoadingContext } from '../contexts/LoadingContext';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  //   const currentUser = React.useContext(CurrentUserContext);
  //   const isLoading = React.useContext(LoadingContext);
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name="avatar-edit"
      title="Обновить аватар"
      buttonText="Сохранить"
      buttonTextProgress="Сохранение.."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      // ...props
    >
      <input
        className="popup__input form__input text text_size_small form-avatar__input"
        type="url"
        name="avatar"
        // value=""
        required
        placeholder="https://site.com"
        ref={avatarRef}
        // onChange={handleAvatarChange}
      />
      <span className="popup__error popup__error-avatar"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

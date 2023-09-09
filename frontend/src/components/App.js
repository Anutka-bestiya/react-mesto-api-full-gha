import React from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
// import Loading from './Loading';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import avatar from '../images/personal-image.jpg';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { LoadingContext } from '../contexts/LoadingContext';
import { LoggedInContext } from '../contexts/LoggedInContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  const [selectedCard, isSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({
    name: 'Персональная страница',
    about: 'О себе',
    avatar: avatar
  });

  const [isLoggedIn, setIsLoggedIn] = React.useState(null);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isSucsess, setIsSucsess] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    api
      .getUserInfoServe()
      .then(user => {
        setCurrentUser(user);
      })
      .catch(err => {
        console.log(`Ошибка получения currentUser: ${err}`);
      });
  }, [isLoggedIn]);

  const handleLogin = boolean => {
    setIsLoggedIn(boolean);
    setIsSucsess(boolean);
  };

  React.useEffect(() => {
    api
      .getInitialCards()
      .then(cards => {
        setCards(cards);
      })
      .catch(err => {
        console.log(`Ошибка получения массива Cards: ${err}`);
      });
  }, [isLoggedIn]);

  const tokenCheck = () => {
    auth
      .checkToken()
      .then(res => {
        setCurrentUser(res)
        setIsLoggedIn(true);
        navigate(location.pathname);
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
        setIsLoggedIn(false);
        navigate('/signin', { replace: true });
      });
  };

  React.useEffect(() => {
    tokenCheck(); // проверка токена
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (isLoggedIn === null) {
  //   return <Loading />;
  // }

  function handleCardClick(name, link) {
    isSelectedCard({ name, link });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
      })
      .catch(err => {
        console.log(`Ошибка обновления данных лайка: ${err}`);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(
        setCards(
          cards.filter(c => {
            if (c._id !== card._id) {
              return c;
            }
          })
        )
      )
      .catch(err => {
        console.log(`Ошибка удаления Card: ${err}`);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);
    api
      .saveNewCard({ name, link })
      .then(newCard => {
        const newCards = [newCard, ...cards];
        setCards(newCards);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка создания NewCard: ${err}`))
      .finally(() => {
        setIsLoading(false); // Здесь изменяем текст кнопки
      });
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api
      .setUserInfoServe({ name, about })
      .then(newData => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка отправки данных на сервер: ${err}`);
      })
      .finally(setIsLoading(false));
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api
      .setUserAvatarServe({ avatar })
      .then(newData => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка отправки данных на сервер: ${err}`);
      })
      .finally(setIsLoading(false));
  }

  function handleSetIsSucsess() {
    setIsSucsess(true);
  }

  function handleSetMessage(e) {
    setMessage(e);
  }

  function handleCloseInfoTooltip(nav) {
    if (isSucsess) {
      navigate(nav, { replace: true });
    }
    setIsInfoTooltipOpen(false);
    setIsSucsess(false);
    setMessage('');
  }

  function handleSetIsLoading(boolean) {
    setIsLoading(boolean);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    isSelectedCard(null);
  }

  return (
    <LoggedInContext.Provider value={isLoggedIn}>
      <CurrentUserContext.Provider value={currentUser}>
        <LoadingContext.Provider value={isLoading}>
          <div className="App">
            <Header handleLogin={handleLogin}/>
            <Routes>
              <Route
                path="*"
                element={
                  isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />
                }
              />
              <Route
                path="/sign-in"
                element={
                  <Login
                    name="login"
                    title="Вход"
                    buttonText="Войти"
                    buttonTextProgress="Авторизация.."
                    onInfoTooltip={setIsInfoTooltipOpen}
                    handleSetMessage={handleSetMessage}
                    handleSetIsSucsess={handleSetIsSucsess}
                    handleSetIsLoading={handleSetIsLoading}
                    handleLogin={handleLogin}
                  >
                    <InfoTooltip
                      isOpen={isInfoTooltipOpen}
                      onClose={handleCloseInfoTooltip}
                      isSucsess={isSucsess}
                      message={message}
                      nav="/main"
                    />
                  </Login>
                }
              />
              <Route
                path="/sign-up"
                element={
                  <Register
                    name="register"
                    title="Регистрация"
                    buttonText="Зарегистрироваться"
                    buttonTextProgress="Регистрация.."
                    onInfoTooltip={setIsInfoTooltipOpen}
                    handleSetMessage={handleSetMessage}
                    handleSetIsSucsess={handleSetIsSucsess}
                    handleSetIsLoading={handleSetIsLoading}
                  >
                    <InfoTooltip
                      isOpen={isInfoTooltipOpen}
                      onClose={handleCloseInfoTooltip}
                      isSucsess={isSucsess}
                      message={message}
                      nav="/sign-in"
                    />
                  </Register>
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute
                    element={
                      <Main
                        onEditProfile={setIsEditProfilePopupOpen}
                        onEditAvatar={setIsEditAvatarPopupOpen}
                        onAddPlace={setIsAddPlacePopupOpen}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        cards={cards}
                      />
                    }
                  />
                }
              />
            </Routes>
            <Footer />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onUpdateCard={handleAddPlaceSubmit}
            />
            <PopupWithForm
              name="confirm"
              title="Вы уверены?"
              buttonText="Да"
              // isOpen={}
              onClose={closeAllPopups}
            />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          </div>
        </LoadingContext.Provider>
      </CurrentUserContext.Provider>
    </LoggedInContext.Provider>
  );
}

export default App;

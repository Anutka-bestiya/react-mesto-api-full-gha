import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LoggedInContext } from '../contexts/LoggedInContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import * as auth from '../utils/auth';
import logo from '../images/logo.svg';

function Header({ handleLogin }) {
  const isLoggedIn = React.useContext(LoggedInContext);
  const currentUser = React.useContext(CurrentUserContext);
  const navigate = useNavigate();
  const location = useLocation();

  function signOut() {
    auth
      .logout()
      .then(() => {
        handleLogin(false);
        navigate('/sign-in', {replace: true});
      })
      .catch(err => console.log(`Ошибка выхода: ${err}`));
  }

  return (
    <header className="header section">
      <a className="link" href="/">
        <img src={logo} alt="Логотип: Место.Россия" className="logo header__logo" />
      </a>
      {isLoggedIn ? (
        <nav className="header__nav">
          <p className="header__text text text_theme_black">{currentUser.email}</p>
          <Link to="/sign-out" className="link header__link text link_color_grey" onClick={signOut}>
            Выйти
          </Link>
        </nav>
      ) : (
        (location.pathname !== '/sign-up' && (
          <Link to="/sign-up" className="link header__link text">
            Регистрация
          </Link>
        )) ||
        (location.pathname !== '/sign-in' && (
          <Link to="/sign-in" className="link header__link text">
            Войти
          </Link>
        ))
      )}
    </header>
  );
}

export default Header;

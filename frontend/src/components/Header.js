import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LoggedInContext } from '../contexts/LoggedInContext';
import logo from '../images/logo.svg';

function Header({ emailUser, handleLogin }) {
  const isLoggedIn = React.useContext(LoggedInContext);
  const navigate = useNavigate();
  const location = useLocation();

  function signOut() {
    // localStorage.removeItem('jwt');
    handleLogin(false);
    navigate('/sign-in');
  }
  return (
    <header className="header section">
      <a className="link" href="#">
        <img src={logo} alt="Логотип: Место.Россия" className="logo header__logo" />
      </a>
      {isLoggedIn ? (
        <nav className="header__nav">
          <p className="header__text text text_theme_black">{emailUser}</p>
          <Link to="/sign-in" className="link header__link text link_color_grey" onClick={signOut}>
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

import React from 'react';
import { LoadingContext } from '../contexts/LoadingContext';
import { useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth';
import AuthForm from './AuthForm';

function Login(props) {
  const isLoading = React.useContext(LoadingContext);
  const navigate = useNavigate();
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleChange = e => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const formErrorSpan = document.querySelector('.form__spanerror');

    props.handleSetIsLoading(true);
    if (!formValue.email || !formValue.password) {
      props.handleSetMessage('Что-то пошло не так! Попробуйте ещё раз.');
      formErrorSpan.classList.add('popup__error_visible');
      props.onInfoTooltip(true);
      return;
    }
    auth
      .authorize(formValue.email, formValue.password)
      .then(data => {
        if (data) {
          props.handleSetIsSucsess(true);
          setFormValue({ email: '', password: '' });
          navigate('/main', { replace: true });
          // localStorage.setItem('jwt', data.token);
          props.handleLogin(true);
        } else {
          formErrorSpan.classList.add('popup__error_visible');
          props.onInfoTooltip(true);
        }
      })
      .catch(err => {
        console.log(err);
        if (err === 400 || 401) {
          props.handleSetMessage('Что-то пошло не так! Попробуйте ещё раз.');
          if (err === 400) {
            setErrorMessage('400 - не передано одно из полей');
          }
          setErrorMessage('401 - пользователь с email не найден ');
          formErrorSpan.classList.add('popup__error_visible');
          props.onInfoTooltip(true);
          return;
        }
      })
      .finally(() => {
        props.handleSetIsLoading(false);
      });
  }

  return (
    <section className="login section">
      <h1 className="title login__title text_theme_black">{props.title}</h1>
      <AuthForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        errorMessage={errorMessage}
        onInfoTooltip={props.onInfoTooltip}
        buttonTextProgress={props.buttonTextProgress}
        buttonText={props.buttonText}
      >
        <input
          className="login__input form__input form__input_theme_black text text_size_small text_theme_black form-login-email"
          required
          id="email"
          name="email"
          type="email"
          value={formValue.email}
          onChange={handleChange}
          placeholder="email"
        />
        <input
          className="login__input form__input form__input_theme_black text text_size_small text_theme_black form-login-password"
          required
          id="password"
          name="password"
          type="password"
          value={formValue.password}
          onChange={handleChange}
          placeholder="password"
        />
      </AuthForm>
      {props.children}
    </section>
  );
}

export default Login;

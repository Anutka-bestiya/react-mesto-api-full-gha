import React, { useState } from 'react';
import { LoadingContext } from '../contexts/LoadingContext';
import { Link } from 'react-router-dom';
import * as auth from '../utils/auth';
import AuthForm from './AuthForm';

function Register(props) {
  const isLoading = React.useContext(LoadingContext);
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

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

    // if (formValue.password !== formValue.confirmPassword) {
    //   setErrorMessage('Пароли не совпадают!');
    //   formErrorSpan.classList.add('popup__error_visible');
    //   return;
    // }
    {
      props.handleSetIsLoading(true);
      const { email, password } = formValue;
      auth
        .register(email, password)
        .then(res => {
          console.log(res);
          props.handleSetMessage('Вы успешно зарегистрировались!');
          props.handleSetIsSucsess(true);
        })
        .catch(err => {
          console.log(`Ошибка регистрации ${err}`);
          if (err === 400) {
            console.log(`Ошибка: ${err} - некорректно заполнено одно из полей`);
            props.handleSetMessage('Что-то пошло не так! Попробуйте ещё раз.');
          }
        })
        .finally(() => {
          props.handleSetIsLoading(false);
          setErrorMessage('');
          formErrorSpan.classList.remove('popup__error_visible');
        });
    }
  }

  return (
    <section className="register section">
      <h1 className="title register__title text_theme_black">{props.title}</h1>
      <AuthForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        errorMessage={errorMessage}
        onInfoTooltip={props.onInfoTooltip}
        buttonTextProgress={props.buttonTextProgress}
        buttonText={props.buttonText}
      >
        <input
          className="register__input form__input form__input_theme_black text text_size_small text_theme_black form-register-email"
          required
          id="email"
          name="email"
          type="email"
          value={formValue.email}
          onChange={handleChange}
          placeholder="email"
        />
        <input
          className="register__input form__input form__input_theme_black text text_size_small text_theme_black form-register-password"
          required
          id="password"
          name="password"
          type="password"
          value={formValue.password}
          onChange={handleChange}
          placeholder="password"
        />
        {/* <input
          className="register__input form__input form__input_theme_black text text_size_small text_theme_black form-register-confirmPassword"
          required
          id="confirmPassword"
          name="confirmPassword"
          type="confirmPassword"
          value={formValue.confirmPassword}
          onChange={handleChange}
          placeholder="confirmPassword"
        /> */}
      </AuthForm>
      <p className="register__text text text_size_small text_theme_black">
        Уже зарегистрированы?{' '}
        <Link to="/sign-in" className="link text text_size_small text_theme_black">
          Войти
        </Link>
      </p>
      {props.children}
    </section>
  );
}

export default Register;

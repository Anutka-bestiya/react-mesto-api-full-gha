import React from 'react';

function AuthForm(props) {
  return (
    <form onSubmit={props.onSubmit} className="form-auth form">
      {props.children}
      <span className="form__spanerror text_theme_black popup__error text text_size_small ">
        {props.errorMessage}
      </span>
      <button
        type="submit"
        className="form__button button button_theme_black text-button text "
        value="Отправить форму сейчас"
        onClick={props.onInfoTooltip}
      >
        {props.isLoading ? props.buttonTextProgress : props.buttonText}
        <div className="sr-only">{props.buttonText}</div>
      </button>
    </form>
  );
}

export default AuthForm;

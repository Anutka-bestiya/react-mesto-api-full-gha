import React from 'react';
import check from '../images/union.svg';
import cross from '../images/cross.svg';

const InfoTooltip = props => {
  return props.message ? (
    <section className={`infotooltip popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__inactiv-close">
        <button className="button-close button" onClick={() => props.onClose(props.nav)}>
          <div className="sr-only">Закрыть</div>
        </button>
        {props.isSucsess ? (
          <img className="infotooltip__image" src={check} alt="Галочка в круге" />
        ) : (
          <img className="infotooltip__image" src={cross} alt="Крестик в круге" />
        )}
        <h2 className="infotooltip__title title popup__title">{props.message}</h2>
      </div>
    </section>
  ) : (
    ''
  );
};

export default InfoTooltip;

const { celebrate, Joi } = require('celebrate');
const { PASS_REGEX, LINK_REGEX } = require('./regex');

const userAuthValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).regex(PASS_REGEX),
  }),
});

const userCreateValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(LINK_REGEX),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).regex(PASS_REGEX),
  }),
});

const userIdValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

const userDataValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const userAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(LINK_REGEX).required(),
  }),
});

const cardDataValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().regex(LINK_REGEX),
  }),
});

const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  userAuthValidation,
  userCreateValidation,
  userIdValidation,
  userDataValidation,
  userAvatarValidation,
  cardDataValidation,
  cardIdValidation,
};

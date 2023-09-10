const mongoose = require('mongoose');
const { LINK_REGEX } = require('../utils/regex');

const cardSchema = new mongoose.Schema({
  name: {
    type: String, // строка
    required: true, // обязательное поле
    minlength: [2, 'Имя должно быть длиной от 2 символов'],
    maxlength: [30, 'Имя должно быть длиной до 30 символов'],
  },
  link: {
    required: true,
    type: String,
    validate: {
      validator: (url) => LINK_REGEX.test(url),
      message:
        'Введенный URL адрес некорректный, введите корректный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true, // ссылка на модель автора карточки, тип ObjectId, обязательное поле;
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [], // список лайкнувших пользователей, массив ObjectId, по умолчанию — пустой массив
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // дата создания, тип Date, значение по умолчанию Date.now
  },
});

module.exports = mongoose.model('card', cardSchema);

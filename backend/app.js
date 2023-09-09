/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
// const path = require("path");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
require('dotenv').config();
const { rateLimit } = require('express-rate-limit');
const cors = require('cors');
const routes = require('./routes/router');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://mesto-anchikfyz.nomoredomainsicu.ru',
  'http://mesto-anchikfyz.nomoredomainsicu.ru',
  'https://api.mesto-anchikfyz.nomoredomainsicu.ru',
  'http://api.mesto-anchikfyz.nomoredomainsicu.ru',
  'http://localhost:3000',
];

app.use(cors(
  { origin: allowedCors, credentials: true, allowedHeaders: ['Access-Control-Request-Headers'] },
));

app.use(helmet());
// подключаем rate-limiter
app.use(limiter);
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use(cookieParser()); // подключаем парсер кук как мидлвэр

// app.use(express.static(path.join(__dirname, "public")));

app.use(requestLogger); // подключаем логгер запросов
// Подключение маршрутов приложения
app.use(routes); // запускаем роутинг

app.use(errorLogger); // подключаем логгер ошибок
// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

// наш централизованный обработчик
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  let { statusCode } = err;
  const { message } = err;
  if (!statusCode) { statusCode = 500; }
  res
    .status(statusCode)
    .send(
      { message: statusCode !== 500 ? message : 'Произошла ошибка на сервере' },
    );
});

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('БД подключена'))
  .catch(() => console.log('не удалось подключиться к БД'));

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

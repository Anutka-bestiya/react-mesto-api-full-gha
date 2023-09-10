/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
require('dotenv').config();
const { rateLimit } = require('express-rate-limit');
const cors = require('cors');
const routes = require('./routes/router');
const centralizedErrorHandler = require('./middlewares/centralized-error-handler');
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
  {
    origin: allowedCors,
    credentials: true,
    allowedHeaders: ['Access-Control-Request-Headers'],
  },
));

app.use(helmet());
app.use(limiter); // подключаем rate-limiter
app.use(express.json()); // для собирания JSON-формата
app.use(cookieParser()); // подключаем парсер кук как мидлвэр

// app.use(express.static(path.join(__dirname, "public")));

app.use(requestLogger); // подключаем логгер запросов
// Подключение маршрутов приложения
app.use(routes); // запускаем роутинг

app.use(errorLogger); // подключаем логгер ошибок
// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate
// наш централизованный обработчик
app.use(centralizedErrorHandler);

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('БД подключена'))
  .catch(() => console.log('не удалось подключиться к БД'));

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log('App listening on port ', PORT);
});

// eslint-disable-next-line consistent-return, no-unused-vars
const centralizedErrorHandler = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  let { statusCode } = err;
  const { message } = err;

  if (!statusCode) { statusCode = 500; }
  return res
    .status(statusCode)
    .send(
      { message: statusCode !== 500 ? message : 'Произошла ошибка на сервере' },
    );
};

module.exports = centralizedErrorHandler;

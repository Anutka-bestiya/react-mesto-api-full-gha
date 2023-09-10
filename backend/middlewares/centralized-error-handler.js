// eslint-disable-next-line consistent-return
const centralizedErrorHandler = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  console.log(err);
  let { statusCode } = err;
  console.log(statusCode);
  const { message } = err;
  console.log(message);
  if (!statusCode) { statusCode = 500; }
  console.log(statusCode);
  console.log(res);
  return res
    .status(statusCode)
    .send(
      { message: statusCode !== 500 ? message : 'Произошла ошибка на сервере' },
    );
};
module.exports = centralizedErrorHandler;

export const BASE_URL = 'http://localhost:4000';

function checkRes(res) {
  return res.ok ? res.json() : Promise.reject(res.status);
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/sign-up`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include', // теперь куки посылаются вместе с запросом
    body: JSON.stringify({ email, password })
  }).then(res => {
    return checkRes(res);
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/sign-in`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include', // теперь куки посылаются вместе с запросом
    body: JSON.stringify({ email, password })
  }).then(res => {
    return checkRes(res);
  });
};

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include', // теперь куки посылаются вместе с запросом
  })
    .then(res => {
      return checkRes(res);
    })
    .then(data => {
      console.log(data);
      return data;
    });
};

export const logout = () => {
  return fetch(`${BASE_URL}/sign-out`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include', // теперь куки посылаются вместе с запросом
  }).then(res => {
    return checkRes(res);
  });
};
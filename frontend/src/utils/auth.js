export const BASE_URL = 'http://localhost:4000';

const checkRes = res => {
  return res.ok ? res.json() : Promise.reject(res.status);
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
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
  return fetch(`${BASE_URL}/signin`, {
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
    .then(data => data);
};

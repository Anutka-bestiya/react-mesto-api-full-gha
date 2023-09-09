class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  //запрос и изменение данных о пользователе
  getUserInfoServe() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include', // теперь куки посылаются вместе с запросом
    }).then(res => this._checkRes(res));
  }

  setUserInfoServe({ name, about }) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include', // теперь куки посылаются вместе с запросом
      body: JSON.stringify({ name, about })
    }).then(res => this._checkRes(res));
  }

  setUserAvatarServe({ avatar }) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include', // теперь куки посылаются вместе с запросом
      body: JSON.stringify({ avatar })
    }).then(res => this._checkRes(res));
  }

  //запрос карточек
  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      credentials: 'include', // теперь куки посылаются вместе с запросом
    }).then(res => this._checkRes(res));
  }

  saveNewCard({ name, link }) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      credentials: 'include', // теперь куки посылаются вместе с запросом
      body: JSON.stringify({ name, link })
    }).then(res => this._checkRes(res));
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include', // теперь куки посылаются вместе с запросом
    }).then(res => this._checkRes(res));
  }

  changeLikeCardStatus(id, isLike) {
    const method = isLike ? 'PUT' : 'DELETE';
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: method,
      headers: this._headers,
      credentials: 'include', // теперь куки посылаются вместе с запросом
    }).then(res => this._checkRes(res));
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;

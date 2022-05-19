export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
}

_checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

getUserInfo() {
  return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
  .then(this._checkResponse);
}

getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      })
      .then(this._checkResponse);
}

patchUserInfo(item){
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            name: item.name,
            about: item.hobby
          })
      })
      .then(this._checkResponse);
}

patchUserAvatar(item){
  return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
          avatar: item.avatar
        })
    })
    .then(this._checkResponse);
}

postNewCard(item) {
  return fetch(`${this._baseUrl}/cards`, {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify({
      name: item.text,
      link: item.photo
    }),
  })
  .then(this._checkResponse);
}

deleteCard(id) {
  return fetch(`${this._baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: this._headers
  })
  .then(this._checkResponse);
}

addLike(id) {
  return fetch(`${this._baseUrl}/cards/${id}/likes`, {
    method: 'PUT',
    headers: this._headers
  })
  .then(this._checkResponse);
}

deleteLike(id) {
  return fetch(`${this._baseUrl}/cards/${id}/likes`, {
    method: 'DELETE',
    headers: this._headers
  })
  .then(this._checkResponse);
}

}
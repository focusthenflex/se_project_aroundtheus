// baseURL: https://around-api.en.tripleten-services.com/v1/

export default class Api {
  constructor(options) {
    this._baseURL = options.baseURL;
    this._headers = options.headers;
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUser()]);
  }

  getUser() {
    const url = `${this._baseURL}/users/me`;
    const options = {
      headers: this._headers,
    };
    return this._request(url, options);
  }

  updateProfile({ name, about }) {
    const url = `${this._baseURL}/users/me`;
    const method = "PATCH";
    const options = {
      method: method,
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    };
    return this._request(url, options);
  }

  updateAvatar({ avatar }) {
    const url = `${this._baseURL}/users/me/avatar`;
    const method = "PATCH";
    const options = {
      headers: this._headers,
      method: method,
      body: JSON.stringify({
        avatar,
      }),
    };
    return this._request(url, options);
  }

  getInitialCards() {
    const url = `${this._baseURL}/cards`;
    const options = {
      headers: this._headers,
    };
    return this._request(url, options);
  }

  createNewCard({ name, link }) {
    const url = `${this._baseURL}/cards`;
    const method = "POST";
    const options = {
      headers: this._headers,
      method: method,
      body: JSON.stringify({
        name,
        link,
      }),
    };
    return this._request(url, options);
  }

  deleteCard(cardID) {
    const method = "DELETE";
    const url = `${this._baseURL}/cards/${cardID}`;
    const options = {
      headers: this._headers,
      method: method,
    };
    return this._request(url, options);
  }

  updateCardLike(card) {
    const cardID = card.getCardID();
    const method = card.isLiked ? "DELETE" : "PUT";
    const url = `${this._baseURL}/cards/${cardID}/likes`;
    const options = {
      headers: this._headers,
      method: method,
    };
    return this._request(url, options);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }
}

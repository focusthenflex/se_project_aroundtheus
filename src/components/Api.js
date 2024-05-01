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
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  updateProfile({ name, about }) {
    const method = "PATCH";
    return fetch(`${this._baseURL}/users/me`, {
      method: method,
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  updateAvatar({ avatar }) {
    const method = "PATCH";

    return fetch(`${this._baseURL}/users/me/avatar`, {
      headers: this._headers,
      method: method,
      body: JSON.stringify({
        avatar,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getInitialCards() {
    // const headers = Object.assign()
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  createNewCard({ name, link }) {
    const method = "POST";
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers,
      method: method,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  deleteCard(cardID) {
    const method = "DELETE";
    return fetch(`${this._baseURL}/cards/${cardID}`, {
      headers: this._headers,
      method: method,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  updateCardLike(card) {
    const cardID = card.getCardID();
    const method = card.isLiked ? "DELETE" : "PUT";

    return fetch(`${this._baseURL}/cards/${cardID}/likes`, {
      headers: this._headers,
      method: method,
    })
      .then((res) => {
        if (res.ok) {
          card.isLiked = !card.isLiked;
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

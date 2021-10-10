class	Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  handleResponse = (res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    }
    return res.json();
  }

  getIngredients() {
    return fetch(`${this._baseUrl}/ingredients`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(this.handleResponse);
  }

  createOrder(data) {
    return fetch(`${this._baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "ingredients": data
      })
    })
      .then(this.handleResponse);
  }

  registration({name, email, password}) {
    return fetch(`${this._baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    })
      .then(this.handleResponse);
  }

  authorization(data) {
    return fetch(`${this._baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(this.handleResponse);
  }

  checkToken(data) {
    return fetch(`${this._baseUrl}/auth/token`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(this.handleResponse);
  }

}

const baseUrl = 'https://norma.nomoreparties.space/api';

const api = new Api(baseUrl);
export default api;

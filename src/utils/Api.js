class	Api {
  constructor(baseUrl, orderUrl) {
    this.baseUrl = baseUrl;
    this.orderUrl = orderUrl;
  }

  handleResponse = (res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    }
    return res.json();
  }

  getIngredients() {
    return fetch(this.baseUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(this.handleResponse);
  }

  createOrder(data) {
    return fetch(this.orderUrl, {
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

}

const baseUrl = 'https://norma.nomoreparties.space/api/ingredients';
const orderUrl = 'https://norma.nomoreparties.space/api/orders';

const api = new Api(baseUrl, orderUrl);
export default api;

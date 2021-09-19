class	Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
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

}

const baseUrl = 'https://norma.nomoreparties.space/api/ingredients ';
const api = new Api(baseUrl);
export default api;

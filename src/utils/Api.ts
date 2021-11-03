type TApi = {
  baseUrl: string
}

type TLogin = {
  name?: string,
  email: string,
  password: string,
  code?: string
}

type TUpdateUser = {
  data: TLogin,
  auth: string,
}

type TString = {
  data: string,
}

class	Api {
  _baseUrl: string
  constructor({baseUrl}:TApi) {
    this._baseUrl = baseUrl;
  }

  handleResponse = <T>(res:Response):Promise<T> => {
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
      .then((res) => this.handleResponse(res));
  }

  createOrder(data:string[]) {
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
      .then((res) => this.handleResponse(res));
  }

  registration(data:TLogin) {
    return fetch(`${this._baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((res) => this.handleResponse(res));
  }

  authorization(data:TLogin) {

    return fetch(`${this._baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((res) => this.handleResponse(res));
  }

  getCurrentUser(data:string) {
    return fetch(`${this._baseUrl}/auth/user`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `${data}`
      },
    })
      .then((res) => this.handleResponse(res));
  }

  updateCurrentUser({auth, data}:TUpdateUser) {
    return fetch(`${this._baseUrl}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `${auth}`
      },
      body: JSON.stringify(data)
    })
      .then((res) => this.handleResponse(res));
  }

  logout(data:TString) {
    return fetch(`${this._baseUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.data)
    })
      .then((res) => this.handleResponse(res));
  }

  checkToken() {
    return fetch(`${this._baseUrl}/auth/token`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken")
      }),
    })
      .then((res) => this.handleResponse(res));  }

  forgotPassword(data:string) {
    return fetch(`${this._baseUrl}/password-reset`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: `${data}`
      }),
    })
      .then((res) => this.handleResponse(res));  }

 resetPassword(data:any) {
    console.log(data)
    return fetch(`${this._baseUrl}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then((res) => this.handleResponse(res));  }

}

const baseUrl = 'https://norma.nomoreparties.space/api';

const api = new Api({baseUrl});
export default api;

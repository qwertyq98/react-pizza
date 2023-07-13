class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  makeResponse(url, params) {
    return fetch(`${this.baseUrl}/${url}`, {
      ...params,
      headers: this.headers,
    })
    .then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    
    return res.json().then(data => {
      return Promise.reject(data.message);
    });
  }

  getPizzas() {
    return this.makeResponse('items', {
      metod: 'GET',
    })
    .then(result => result);
  }
}

const api = new Api({
  baseUrl: "https://64b03ccac60b8f941af5724f.mockapi.io",
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;
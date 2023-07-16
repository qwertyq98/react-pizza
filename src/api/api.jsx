class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }
  makeResponse(url, params) {
    return fetch(`${this.baseUrl}/${url}`, {
      ...params,
      headers: this.headers,
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return res.json().then((data) => {
      return Promise.reject(data.message);
    });
  }

  getPizzas(categoryId, sortProperty, searchValue, currentPage) {
    const params = {
      limit: 4,
      page: currentPage,
      sortBy: sortProperty.replace('-', ''),
      order: sortProperty.includes('-') ? 'ask' : 'desc',
      search: searchValue ? searchValue : ''
    }

    if (categoryId > 0) {
      params.category = categoryId;
    }

    return this.makeResponse(
      `items${makeQueryParams(params)}`,
      {
        metod: 'GET',
      },
    ).then((result) => result);
  }
}

const api = new Api({
  baseUrl: 'https://64b03ccac60b8f941af5724f.mockapi.io',
  headers: {
    'Content-Type': 'application/json',
  },
});

function makeQueryParams(obj) {
  let res ='?';
  for (let key in obj) {
    res += `${key}=${obj[key]}&`;
  }

  return res;
}

export default api;

import axios from "axios";


class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }
  makeResponse(url, params) {
    return axios.get(`${this.baseUrl}/${url}`, {
      ...params,
      headers: this.headers,
    })
    .then(res => {
      return res.data
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
    )
  }

  getPizza(id) {
    return this.makeResponse(
      `items/${String(id)}`,
      {
        metod: 'GET',
      },
    )
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

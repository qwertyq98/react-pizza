import axios from "axios";

type ApiProps = {
  baseUrl: string;
  headers: any
}

class Api {
  baseUrl: string;
  headers: any;

  constructor({ baseUrl, headers }: ApiProps) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }
  makeResponse(url: string, params: any) {
    return axios.get(`${this.baseUrl}/${url}`, {
      ...params,
      headers: this.headers,
    })
    .then(res => {
      return res.data
    });
  }

  getPizzas(categoryId: number, sortProperty: string, searchValue: number, currentPage: number) {
    const params = {
      limit: 4,
      page: currentPage,
      sortBy: sortProperty.replace('-', ''),
      order: sortProperty.includes('-') ? 'ask' : 'desc',
      search: searchValue ? searchValue : '',
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

  getPizza(id: number) {
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

function makeQueryParams(obj: any) {
  let res ='?';
  for (let key in obj) {
    res += `${key}=${obj[key]}&`;
  }

  return res;
}

export default api;

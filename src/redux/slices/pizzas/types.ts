import { SortType } from "../filter/types";

export type fetchPizzasArgs = {
  categoryId: number,
  sortProperty?: string, 
  sort: SortType,
  searchValue: string, 
  pageCount: number,
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
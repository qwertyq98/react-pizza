export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASK = '-rating',
  PRICE_DESC = 'price',
  PRICE_ASK = '-price',
  TITLE_DESC = 'title',
  TITLE_ASK = '-title',
}

export type SortType = {
  name: string,
  sortProperty: string,
}

export interface FilterSliceState {
  categoryId: number,
  searchValue: string,
  pageCount: number,
  sort: SortType,
  sortProperty: string
}
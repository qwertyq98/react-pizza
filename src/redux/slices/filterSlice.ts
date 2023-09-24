import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

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

const initialState: FilterSliceState = {
  categoryId: 0,
  searchValue: '',
  pageCount: 1,
  sortProperty: SortPropertyEnum.RATING_DESC,
  sort: {
    name: 'популярности',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<SortType>) {
      state.sort = action.payload;
      // state.sortProperty = action.payload.sortProperty;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.pageCount = Number(action.payload.pageCount);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    }
  }
})

export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSort, setPageCount, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
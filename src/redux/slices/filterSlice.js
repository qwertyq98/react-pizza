import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    categoryId: 0,
    pageCount: 1,
    sort: {
      name: 'популярности',
      sortProperty: 'rating',
    }
  },
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
    setFilters(state, action) {
      state.pageCount = Number(action.payload.pageCount);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    }
  }
})

export const { setCategoryId, setSort, setPageCount, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
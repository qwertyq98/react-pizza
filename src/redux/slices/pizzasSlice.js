import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const {categoryId, sort, searchValue, pageCount} = params;
  const items = await api.getPizzas(categoryId, sort.sortProperty, searchValue, pageCount);
  return items;
});

export const pizzasSlice = createSlice({
  name: 'pizzza',
  initialState: {
    items: [],
    status: 'loading',
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    }
  },
})

export const selectPizzaData = state => state.pizza;
export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
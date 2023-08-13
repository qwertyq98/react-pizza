import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkAPI) => {
  const {categoryId, sort, searchValue, pageCount} = params;
  const items = await api.getPizzas(categoryId, sort.sortProperty, searchValue, pageCount);
  console.log(thunkAPI)
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

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
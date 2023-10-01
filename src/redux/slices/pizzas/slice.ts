import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPizzasArgs, Status } from './types';
import api from '../../../api/api';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params: fetchPizzasArgs) => {
  const {categoryId, sort, searchValue, pageCount} = params;
  const items = await api.getPizzas(categoryId, sort.sortProperty, searchValue, pageCount);
  return items as PizzaItem[];
});

type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
}

interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING
}

export const pizzasSlice = createSlice({
  name: 'pizzza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    })
  }
})

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
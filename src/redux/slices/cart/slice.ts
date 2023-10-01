import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../../utils/getCartFromLocalStorage';
import { updateTotalPrice } from '../../../utils/updateTotalPrice';
import { CartItemType, CartSliseState } from './types';

const { items, totalPrice } =  getCartFromLS();

const initialState: CartSliseState = {
  totalPrice: totalPrice,  
  items: items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find(obj => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }
      state.totalPrice = Number(updateTotalPrice(state.items));
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find(obj => obj.id === action.payload)
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return  state.totalPrice - obj.price;
      }, state.totalPrice);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(obj => obj.id !== action.payload);
      state.totalPrice = Number(updateTotalPrice(state.items));
    },
    clearItem(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  }
})

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
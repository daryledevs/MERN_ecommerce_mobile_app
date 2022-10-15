import { createSlice } from "@reduxjs/toolkit";
import {
  addToCartAction,
  removeFromCartAction,
  clearCartAction,
} from '../action/Cart';

const initialState = []


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: addToCartAction,
    removeFromCart: removeFromCartAction,
    clearCart: clearCartAction,
  },
});

export const { addToCart, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;

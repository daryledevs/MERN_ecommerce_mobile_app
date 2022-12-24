import { createSlice } from "@reduxjs/toolkit";
import api from "../../asset/api";
import {
  addToCartAction,
  removeFromCartAction,
  getAllUserCart,
} from '../action/Cart';

const initialState = {
  item_cart: [],
  doneGetCart: false,
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: addToCartAction,
    removeFromCart: removeFromCartAction,
    adjustQuantity: (state, actions) => {
      const {isIncrease, product_id, itemQuantity, user_id} = actions.payload;

      let itemCart = state.item_cart?.find(
        item => item.product_id._id === product_id.product_id._id,
      );

      if (isIncrease) itemCart.quantity += itemQuantity;
      else itemCart.quantity -= itemQuantity;
      
      api
        .put(`/cart/${product_id.product_id._id}/${user_id}`, {
          quantity: itemCart.quantity,
        })
        .then(() => {
          console.log('Product quantity updated');
        });
    },
    clear_cart: (state, action) =>{
      state.item_cart = [];
    },
    cart_fetchFailed: (state, action) =>{
      state.doneGetCart = true;
    }
  },
  extraReducers(builder) {
    builder.addCase(getAllUserCart.pending, (state, actions) => {
      state.doneGetCart = false;
    });

    builder.addCase(getAllUserCart.fulfilled, (state, actions) => {
      const cartData = actions.payload.carts;
      let sort = [];

      state.doneGetCart = true;
      state.item_cart = [...cartData];
    });
  },
});

export const {
  addToCart,
  removeFromCart,
  adjustQuantity,
  cart_fetchFailed,
  clear_cart,
} = cartSlice.actions;
export const cartData = (state) => state.cart.item_cart;
export const FetchCartStatus = (state) => state.cart.doneGetCart;
export default cartSlice.reducer;

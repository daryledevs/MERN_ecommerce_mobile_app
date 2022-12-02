import { createSlice } from "@reduxjs/toolkit";
import api from "../../asset/api";
import {
  addToCartAction,
  removeFromCartAction,
  getAllUserCart,
} from '../action/Cart';

const initialState = {
  item_cart: [],
  doneGetWishlist: false,
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: addToCartAction,
    removeFromCart: removeFromCartAction,
    adjustQuantity: (state, actions) => {
      const { isIncrease, product_id, itemQuantity, user_id } = actions.payload;
      let itemCart = state.item_cart?.find(item => item.product_id === product_id);

      if(isIncrease) itemCart.quantity += itemQuantity;
      else itemCart.quantity -= itemQuantity;

       api
         .put(`/cart/${product_id}/${user_id}`, {quantity: itemCart.quantity})
         .then(() => {
           console.log('Product quantity updated');
         });
    }
  },
  extraReducers(builder){
    builder.addCase(getAllUserCart.pending, (state, actions) => {
      state.doneGetWishlist = false;
    });

    builder.addCase(getAllUserCart.fulfilled, (state, actions) => {
      const cartData  = actions.payload.carts;
      let sort = [];
      
      for (let i = 0; i < cartData.length; i++) {
        sort.push({
          cart_id: cartData[i]._id,
          product_id: cartData[i].product_id._id,
          name: cartData[i].product_id.name,
          price: cartData[i].product_id.price,
          quantity: cartData[i].quantity,
          quantity_stock: cartData[i].product_id.quantity_stock,
        });
      };

      state.doneGetWishlist = true;
      state.item_cart = [...sort];
    });
  }
});

export const { addToCart, removeFromCart, adjustQuantity } = cartSlice.actions;
export const cartData = (state) => state.cart.item_cart;
export const FetchCartStatus = (state) => state.cart.doneGetWishlist;
export default cartSlice.reducer;

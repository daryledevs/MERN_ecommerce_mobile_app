import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../asset/api";

export const getAllUserCart = createAsyncThunk(
  'cart/getAllUserCart',
  async (user_id, {fulfillWithValue, rejectWithValue}) => {
    console.log('USER ID: ', user_id);
    const promise = await api.get(`/cart/${user_id}`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response.data);
      });
    
    const data = await promise;

    return fulfillWithValue(data);
  },
);

export const addToCartAction = (state, action) => {
  let {product, itemQuantity, user_id} = action.payload;
  
  if (state.item_cart?.some(element => element.product_id === product._id)) {
    let itemCart = state.item_cart?.find(
      item => item.product_id === product._id,
    );
    itemCart.quantity += itemQuantity;

    api
      .put(`/cart/${product._id}/${user_id}`, {quantity: itemCart.quantity})
      .then(() => {
        console.log('Product quantity updated');
      });

  } else {
    api
      .post(`/cart/${product._id}/${user_id}`, {quantity: itemQuantity})
      .then(() => {
        console.log('Added to the cart');
      });

    return {
      ...state,
      item_cart: [
        ...state.item_cart,
        {
          product_id: product._id,
          name: product.name,
          price: product.price,
          quantity: itemQuantity,
        },
      ],
    };
  }
};

export const removeFromCartAction = (state, action) => {
  const { product_id, user_id } = action.payload;

  const filtered_state = state.item_cart.filter(
    filter => filter.product_id !== product_id,
  );
  state.item_cart =  filtered_state;
  console.log(state.item_cart);

  api.delete(`/cart/${product_id}/${user_id}`)
    .then((res) => {
      console.log(res.data);
    })
};



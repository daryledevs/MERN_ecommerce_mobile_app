import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../asset/api";
import { clear_cart } from "../reducer/Cart";

export const get_all_orders = createAsyncThunk(
  'order/get_all_orders',
  async (user_id, { fulfillWithValue, rejectWithValue }) => {
    try {
     const response = await api.get(`/order/${user_id}`); 
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const create_orders = createAsyncThunk(
  'order/create_orders',
  async (_, { fulfillWithValue, rejectWithValue, getState, dispatch }) => {
    const user_cart = getState().cart.item_cart;
    const userData = getState().user;
    const extracted_data = [];

    for (let i = 0; i < user_cart.length; i++) {
      extracted_data.push({
        product: user_cart[i].product_id,
        quantity: user_cart[i].quantity,
      });
    }

    const promise = await api
      .post('/order', {
        ordered_items: extracted_data,
        user_id: userData.user_details._id,
        address: userData.user_details.address_id,
        payment_method: 'Card',
      })
      .then(res => {
        dispatch(clear_cart());
        return res.data;
      })
      .catch(error => {
        return rejectWithValue(error.response.data);
      });
    const data = await promise;
    return fulfillWithValue(data);
  },
);


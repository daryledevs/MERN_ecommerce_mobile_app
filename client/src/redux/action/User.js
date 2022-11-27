import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllProducts, getAllCategories } from "../action/Product";
import api from '../../asset/api';
import { getUserLikes } from "./Wishlist";

export const userLogin = createAsyncThunk(
  'user/userLogin',
  async ({ email, password }, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const response = await api.post('users/login', { email, password })
      dispatch(getUserInfoByToken(response.data.token));
      await AsyncStorage.setItem('token', response.data.token);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getUserInfoByToken = createAsyncThunk(
  'user/getUserInfoByToken',
  async (token, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.get(`users/token`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if(!response) throw new Error("Token is not verified");
      
      dispatch(getAllProducts());
      dispatch(getAllCategories());
      dispatch(getUserLikes(response.data._id));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const userLogoutAction = (state, action) => {
  const id = action.payload;
  state.userDetails = {
    _id: '',
    given_name: '',
    last_name: '',
    email: '',
    phone: '',
    isAdmin: '',
    house_number: '',
    street: '',
    subdivision: '',
    district: '',
    city: '',
    zip: '',
    creation_time: null,
    last_time_sign_in: null,
  };
  state.goodByeLoading = true;
  state.loginTriggers = false;
  state.isLogin = false;
  api
    .get(`users/logout/${id}`)
    .then(res => {
      console.log(res.data);
    })
    .catch(error => {
      console.log(error.response.data);
    });

  AsyncStorage.setItem('token', '').then(token => {
    console.log('logout token: ', token);
  });
};
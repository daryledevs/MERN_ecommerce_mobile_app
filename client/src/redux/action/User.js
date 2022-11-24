import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../asset/api';

export const userLogin = createAsyncThunk(
  'user/userLogin',
  async ({ email, password }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.post('users/login', { email, password })
      await AsyncStorage.setItem("token", response.data.token);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.message);
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
  
  api
    .get(`users/logout/${id}`)
    .then(res => {
      console.log(res.data);
    })
    .catch(error => {
      console.log(error.message);
    });

  AsyncStorage.setItem('token', '').then(token => {
    console.log('logout token: ', token);
  });


};

export const getUserInfoByToken = createAsyncThunk(
  'user/getUserInfoByToken',
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.get(`users/token`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
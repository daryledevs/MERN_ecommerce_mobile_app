import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../asset/api';

export const loginUserAction = (state, action) => {
  const { email, password } = action.payload;
  state.loginTriggers = true;
  api
    .post('users/login', {email, password})
    .then(async res => {
      console.log(res.data, res.data.token);
      const token = res.data.token;
      await AsyncStorage.setItem('token', token);
    })
    .catch(error => {
      console.log(error);
    });
};

export const userLogoutAction = (state, action) => {
  const id = action.payload;
  state.userDetails = {};
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
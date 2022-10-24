import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../asset/api';

export const loginUserAction = (state, action) => {
  const {email, password} = action.payload;
  console.log("action.payload: ", email, password);
  state.loginTriggers = !state.loginTriggers;
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
  AsyncStorage.setItem('token', '').then(token => {
    console.log('logout token: ', token);
  });

  state.userDetails = {};
  state.isToken = false;
  state.loginTriggers = false;
};

export const getUserInfoByToken = createAsyncThunk(
  'user/getUserInfoByToken',
  async () => {
    const promise = AsyncStorage.getItem('token')
      .then(async token => {
        try {
          const response = await api.get(`users/token`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          });
          return response.data;
        } catch (error) {
          console.log(error);
        }
      })
      .catch(error => {
        console.log(error);
      });
    const data = await promise;
    return data;
  },
);
import { createSlice } from "@reduxjs/toolkit";
import api from "../../asset/api";
import { userLogin, getUserInfoByToken, userLogoutAction } from "../action/User";

const initialState = {
  user_details: {
    _id: '',
    given_name: '',
    last_name: '',
    email: '',
    phone: '',
    address_id: '',
    isAdmin: '',
    creation_time: null,
    last_time_sign_in: null,
  },
  user_address: [
    {
      _id: '',
      house_number: '',
      street: '',
      barangay: '',
      subdivision: '',
      city: '',
      zip_code: '',
    },
  ],
  isToken: false,
  isLoading: true,
  goodByeLoading: false,
  loginTriggers: false,
  loginError: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    error_cleanup: (state, action)=>{
      state.loginError = "";
    },
    tokenIsNull: (state, action) => {
      state.isLoading = false;
      state.isToken = false;
      state.goodByeLoading = false;
    },
    userLogout: userLogoutAction,
    addNewAddress: (state, action) => {
      console.log('PAYLOAD: ', action.payload);
      state.user_address.push(action.payload);
    },
    dispatchLoading: (state, action) => {
      state.isLoading = true;
    },
    edit_profile: (state, action) => {
      state.user_details = {
        ...state.user_details,
        ...action.payload
      };

      api
        .put(`/users/edit-profile/${state.user_details._id}`, {
          ...action.payload,
        })
        .then(() => {
          console.log('Edit successfully!');
        })
        .catch((error) =>{
          console.log(error.response.data)
        })
    },
  },
  extraReducers(builder) {

    builder.addCase(getUserInfoByToken.fulfilled, (state, action) => {
      console.log('getUserInfoByToken: fulfilled', action.payload);
      return {
        ...state,
        user_details: action.payload.user_details,
        user_address: action.payload.user_address,
        isToken: true,
        isLoading: false,
        loginTriggers: false,
        loginError: '',
      };
    });

     builder.addCase(getUserInfoByToken.rejected, (state, action) => {
      console.log('getUserInfoByToken: rejected ', action.payload);
      state.loginError = action.payload;
      state.isLoading = false;
     });

     builder.addCase(userLogin.pending, (state, action) => {
      state.loginTriggers = true;
     });

     builder.addCase(userLogin.fulfilled, (state, action) => {
      console.log("Login successfully!", action.payload);
      state.loginTriggers = false;
     });

     builder.addCase(userLogin.rejected, (state, action) => {
      state.loginTriggers = false;
      state.loginError = action.payload;
      state.isLoading = false;
      console.log("Login rejected!", action.payload);
     });
  },
});

export const IsToken = (state) => state.user.isToken;
export const Loading = (state) => state.user.isLoading;
export const LoginError = (state) => state.user.loginError;
export const UserDetails = (state) => state.user.user_details;
export const UserAddress = (state) => state.user.user_address;
export const LoginTriggers = (state) => state.user.loginTriggers;
export const GoodByeLoadingState = (state) => state.user.goodByeLoading;

export const {
  userLogout,
  tokenIsNull,
  error_cleanup,
  addNewAddress,
  dispatchLoading,
  edit_profile,
} = userSlice.actions;
export default userSlice.reducer;
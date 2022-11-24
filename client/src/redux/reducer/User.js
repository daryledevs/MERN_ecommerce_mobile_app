import { createSlice } from "@reduxjs/toolkit";
import { userLogin, getUserInfoByToken, userLogoutAction } from "../action/User";

const initialState = {
  userDetails: {
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
  },
  isToken: false,
  isLoading: true,
  goodByeLoading: false,
  loginTriggers: false,
  noTokenLoading: false,
  loginError: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    NoTokenLoading: (state, action) => {
      state.noTokenLoading = true;
    },
    tokenIsNull: (state, action) => {
      state.isLoading = false;
      state.goodByeLoading = false;
      state.isToken = false;
    },
    userLogout: userLogoutAction,
  },
  extraReducers(builder) {

    builder.addCase(getUserInfoByToken.fulfilled, (state, action) => {
      console.log('getUserInfoByToken: fulfilled');
      return {
        ...state,
        userDetails: action.payload,
        isToken: true,
        isLoading: false,
        noTokenLoading: false,
        loginError:"",
      };
    });

     builder.addCase(getUserInfoByToken.rejected, (state, action) => {
      console.log('getUserInfoByToken: rejected');
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
      console.log("Login rejected!", action.payload);
     });
  },
});

export const LoginError = (state) => state.user.loginError;
export const LoginTriggers = (state) => state.user.loginTriggers;
export const Loading = (state) => state.user.isLoading;
export const GoodByeLoadingState = (state) => state.user.goodByeLoading;
export const NoTokenLoadingState = (state) => state.user.noTokenLoading;
export const IsToken = (state) => state.user.isToken;
export const UserDetails = (state) => state.user.userDetails;
export const { userLogout, NoTokenLoading, tokenIsNull } = userSlice.actions;
export default userSlice.reducer;
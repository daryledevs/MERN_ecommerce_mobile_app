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
  },
  extraReducers(builder) {

    builder.addCase(getUserInfoByToken.fulfilled, (state, action) => {
      console.log('getUserInfoByToken: fulfilled');
      return {
        ...state,
        userDetails: action.payload,
        isToken: true,
        isLoading: false,
        loginTriggers: false,
        loginError: "",
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
export const UserDetails = (state) => state.user.userDetails;
export const LoginTriggers = (state) => state.user.loginTriggers;
export const GoodByeLoadingState = (state) => state.user.goodByeLoading;

export const { userLogout, tokenIsNull, error_cleanup } = userSlice.actions;
export default userSlice.reducer;
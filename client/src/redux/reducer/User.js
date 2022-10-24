import { createSlice } from "@reduxjs/toolkit";
import { loginUserAction, getUserInfoByToken, userLogoutAction } from "../action/User";

const initialState = {
  userDetails: {},
  isToken: false,
  isLoading: true,
  loginTriggers: false,
  noTokenLoading: false,
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
    },
    userLogin: loginUserAction,
    userLogout: userLogoutAction,
  },
  extraReducers(builder) {
    builder.addCase(getUserInfoByToken.pending, (state, action) => {
      state.loginTriggers = true;
      console.log('getUserInfoByToken: pending');
    });

    builder.addCase(getUserInfoByToken.fulfilled, (state, action) => {
      console.log('getUserInfoByToken: fulfilled');

      return {
        ...state,
        userDetails: action.payload,
        isToken: true,
        isLoading: false,
        noTokenLoading: false,
      };
    });
  },
});

export const LoginTriggers = state => state.user.loginTriggers;
export const Loading = (state) => state.user.isLoading;
export const NoToken = (state) => state.user.noTokenLoading;
export const Token = (state) => state.user.isToken;
export const { userLogin, userLogout, NoTokenLoading, tokenIsNull } = userSlice.actions;
export default userSlice.reducer;
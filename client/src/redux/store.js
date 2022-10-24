import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import cartReducer from "./reducer/Cart";
import userReducer from './reducer/User';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});

export default store;
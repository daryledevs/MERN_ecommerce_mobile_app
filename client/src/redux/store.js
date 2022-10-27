import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducer/Cart";
import userReducer from './reducer/User';
import productReducer from "./reducer/Product";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    product: productReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
      immutableCheck: {warnAfter: 128},
      serializableCheck: {warnAfter: 128},
  }),
});

export default store;
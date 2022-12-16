import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducer/Cart";
import userReducer from './reducer/User';
import productReducer from "./reducer/Product";
import wishlistReducer from './reducer/Wishlist';
import routeReducer from './reducer/RouteNavigation';
import orderReducer from "./reducer/Order";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    route: routeReducer,
    product: productReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: {warnAfter: 128},
      serializableCheck: {warnAfter: 128},
    }),
});

export default store;
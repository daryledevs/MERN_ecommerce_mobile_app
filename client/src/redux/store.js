import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducer/Cart";
import userReducer from './reducer/User';
import productReducer from "./reducer/Product";
import wishlistReducer from './reducer/Wishlist';
import routeReducer from './reducer/RouteNavigation';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    route: routeReducer,
    product: productReducer,
    wishlist: wishlistReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
      immutableCheck: {warnAfter: 128},
      serializableCheck: {warnAfter: 128},
  }),
});

export default store;
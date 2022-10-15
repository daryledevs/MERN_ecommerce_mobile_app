import {configureStore, applyMiddleware, compose} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import cartReducer from './reducer/Cart';

const store = configureStore(
  {
    reducer: {
      cart: cartReducer,
    },
  },
  compose(applyMiddleware(thunk)),
);

export default store;

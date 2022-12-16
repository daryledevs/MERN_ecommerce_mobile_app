import {createSlice} from '@reduxjs/toolkit';
import { create_orders, get_all_orders } from '../action/Order';

const initialState = {
  ordered_items: [],
  doneGetOrder: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers:{
  
  },
  extraReducers(builder){
    builder.addCase(get_all_orders.pending, (state, action) => {
      state.doneGetOrder = false;
    });

    builder.addCase(get_all_orders.fulfilled, (state, action) => {
      console.log("ORDER ITEMS: ", action.payload);
      return { ordered_items: action.payload, doneGetOrder: true };
    });

    builder.addCase(get_all_orders.rejected, (state, action) => {
      state.doneGetOrder = false;
    });

    builder.addCase(create_orders.fulfilled, (state, action) => {
      console.log('New order', action.payload);
      state.ordered_items.push(action.payload);
    });
  }
});

export const OrderItems = (state) => state.order.ordered_items;
export const FetchOrderStatus = (state) => state.order.doneGetOrder;
export default orderSlice.reducer;

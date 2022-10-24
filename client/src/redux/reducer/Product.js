import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../action/Product";

const initialState = []

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers:{

  },
  extraReducers (builder) {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      return [...state, action.payload];
    })
  }
});

export const productState = (state) => state.product;
export default productSlice.reducer;
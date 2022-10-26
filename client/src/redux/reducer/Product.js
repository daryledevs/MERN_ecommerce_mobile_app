import { createSlice } from "@reduxjs/toolkit";
import { getAllCategories, getAllProducts } from "../action/Product";

const initialState = {
  products: [],
  categories: []
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers:{

  },
  extraReducers (builder) {
    builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
      return { ...state, products: [ ...state.products, ...payload ] };
    })

    builder.addCase(getAllCategories.fulfilled, (state, { payload }) => {
      return { ...state, categories: [ ...state.categories, ...payload ] };
    });
  }
});

export const productState = (state) => state.product.products;
export const categoryState = (state) => state.product.categories;
export default productSlice.reducer;
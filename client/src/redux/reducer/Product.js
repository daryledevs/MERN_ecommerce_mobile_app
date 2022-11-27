import { createSlice } from "@reduxjs/toolkit";
import { getAllCategories, getAllProducts } from "../action/Product";

const initialState = {
  products: [
    {
      _id: '',
      name: '',
      description: '',
      richDescription: '',
      image: '',
      images: [''],
      brand: '',
      price: null,
      category: {
        _id: '',
        name: '',
        description: '',
      },
      countInStock: null,
      rating: null,
      numReviews: null,
      isFeatured: false,
      dateCreated: '',
    },
  ],
  categories: [
    {
      _id: '',
      name: '',
      description: '',
    },
  ],
  fetchProductStatus: {
    doneGetProduct: false,
    doneGetCategory: false,
  },
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    product_fetchFailed: (state, action) => {
      state.fetchProductStatus.doneGetCategory = true;
      state.fetchProductStatus.doneGetProduct = true;
    },
    remove_product_data: (state, action) => {
      state.products = [
        {
          _id: '',
          name: '',
          description: '',
          richDescription: '',
          image: '',
          images: [''],
          brand: '',
          price: null,
          category: {
            _id: '',
            name: '',
            description: '',
          },
          countInStock: null,
          rating: null,
          numReviews: null,
          isFeatured: false,
          dateCreated: '',
        },
      ];
      state.categories = [
        {
          _id: '',
          name: '',
          description: '',
        },
      ];
    },
  },

  extraReducers(builder) {
    builder.addCase(getAllProducts.pending, (state, action) => {
      state.fetchProductStatus.doneGetCategory = false;
      state.fetchProductStatus.doneGetProduct = false;
    });

    builder.addCase(getAllProducts.fulfilled, (state, {payload}) => {
      return {
        ...state,
        fetchProductStatus: {...state.fetchProductStatus, doneGetProduct: true},
        products: [ ...payload],
      };
    });

    builder.addCase(getAllCategories.fulfilled, (state, {payload}) => {
      return {
        ...state,
        fetchProductStatus: {...state.fetchProductStatus, doneGetCategory: true},
        categories: [ ...payload],
      };
    });
  },
});

export const productState = (state) => state.product.products;
export const categoryState = (state) => state.product.categories;
export const FetchProductStatus = state => state.product.fetchProductStatus;
export const { product_fetchFailed, remove_product_data } = productSlice.actions;
export default productSlice.reducer;
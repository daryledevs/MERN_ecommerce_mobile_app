import { createSlice } from "@reduxjs/toolkit";
import api from "../../asset/api";
import { getUserLikes, like_unlike } from "../action/Wishlist";

const initialState = {
  liked_product: [],
  doneGetWishlist: false, 
};

const wishlistReducer = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    wishlist_fetchFailed: (state, action) => {
      state.doneGetWishlist = true;
    },
  },
  extraReducers(builder) {
    builder.addCase(getUserLikes.pending, (state, action) => {
      state.doneGetWishlist = false;
    });

    builder.addCase(getUserLikes.fulfilled, (state, action) => {
      return {
        liked_product: action.payload.usersWishlist,
        doneGetWishlist: true,
      };
    });

    builder.addCase(like_unlike.fulfilled, (state, action) => {
      if (action.payload.isLike) {
        state.liked_product.push(action.payload.liked_product);
      } else {
        const { product_id } = action.payload;
        const item_index = state.liked_product.findIndex(
          item => item._id === product_id,
        );
        state.liked_product.splice(item_index, 1);
      } 
    });
  },
});

export const FetchWishlistStatus = (state) => state.wishlist.doneGetWishlist;
export const Like_product = (state) => state.wishlist.liked_product;
export const { wishlist_fetchFailed } = wishlistReducer.actions;
export default wishlistReducer.reducer;
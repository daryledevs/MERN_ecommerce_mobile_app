import { createSlice } from "@reduxjs/toolkit";
import api from "../../asset/api";
import { getUserLikes, like_unlikeAction } from "../action/Wishlist";

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
    like_unlike: like_unlikeAction,
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
  },
});

export const FetchWishlistStatus = (state) => state.wishlist.doneGetWishlist;
export const Like_product = (state) => state.wishlist.liked_product;
export const { like_unlike, wishlist_fetchFailed } = wishlistReducer.actions;
export default wishlistReducer.reducer;
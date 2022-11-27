import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../asset/api";

export const getUserLikes = createAsyncThunk(
  'wishlist/getUserLikes',
  // _ or cAt both are void parameters, meaning doesn't read. Useful when no parameters and need thunk
  async (userId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.get(`/likes/users-like/${userId}`);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const like_unlikeAction = (state, action) => {
  const not_negative_one = 0;
  const {product_item} = action.payload;
  const item_index = state.liked_product.findIndex(
    item => item._id === product_item._id,
  );

  if (item_index >= not_negative_one) state.liked_product.splice(item_index, 1);
  else state.liked_product.push(product_item);

  api
    .patch(`/likes/like-unlike/${product_item.product_id._id}/${product_item.user_id}`)
    .then(res => {
      console.log(res.data.isLike);
    })
    .catch(error => {
      console.log(error.response.data);
    });
};
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

export const like_unlike = createAsyncThunk(
  'wishlist/like_unlike',
  async ({ product, userId }, { fulfillWithValue, rejectWithValue }) => {
    const promise = await api
      .patch(`/likes/like-unlike/${product._id}/${userId}`)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        return rejectWithValue(error.response.data);
      });
    const data = await promise;
    return fulfillWithValue(data)
  },
);
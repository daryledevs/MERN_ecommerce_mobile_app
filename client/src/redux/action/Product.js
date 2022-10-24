import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../asset/api";


export const getAllProducts = createAsyncThunk("product/getAllProducts", async() => {
  const promise = api.get("/products")
    .then((response) => {
      console.log("Products: ", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  const data = await promise;
  return data;
})
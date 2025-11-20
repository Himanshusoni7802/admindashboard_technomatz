import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../utils/axiosInstance.js";


import axios from "axios";


export const updateProductApi = createAsyncThunk(
  "product/updateUserApi",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/api/product/updateproduct/${userData.id}`,
        userData
      );

      return response.data.product;
    } catch (err) {
      console.error("Update Error:", err);
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);

export const deleteProductApi = createAsyncThunk(
  "product/deleteProductApi",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/api/product/delete/${id}`
      );

      return response.data.findid;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },

  reducers: {

  },

  extraReducers: (builder) => {
    builder

      .addCase(updateProductApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductApi.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;

        state.data = state.data.map((item) =>
          item._id === updatedUser._id || item.id === updatedUser.id
            ? updatedUser
            : item
        );
      })
      .addCase(updateProductApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteProductApi.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(deleteProductApi.fulfilled, (state, action) => {
        state.loading = false;

        const deleteid = action.payload._id;

        state.data = state.data.filter((item) => item._id !== deleteid);
      })
      .addCase(deleteProductApi.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export const {  } = productSlice.actions;
export default productSlice.reducer;

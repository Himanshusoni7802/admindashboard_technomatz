import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../utils/axiosInstance.js";

import axios from "axios";

// import { serverUrl } from "../App";

export const fetchProducts = createAsyncThunk(
  "addpro/fetchProducts",
  async (cat, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/product/allproduct`, {
        params: { category: cat },
      });

      return response.data.products;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch data products");
    }
  }
);

export const createProducts = createAsyncThunk(
  "addpro/createProduct",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/api/product/createproduct`,
        userData
      );

      return response?.data?.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(err.response?.data || "Data is not added");
    }
  }
);

export const filterPrducts = createAsyncThunk(
  "addpro/filterProducts",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/product/allproduct`, {
        params: { category: data },
      });

      console.log("response from api fil", response);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const AddproductSlice = createSlice({
  name: "addpro",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },

  reducers: {
    addFilterData: (state, action) => {
      // console.log(" --------------------> ",action.payload);

      console.log("filter data from add slice  is called ");

      state.data = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createProducts.pending, (state, action) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.loading = false;

        const ds = action.payload;

        state?.data?.push(ds);
      })

      .addCase(createProducts.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export const { addFilterData } = AddproductSlice.actions;

export default AddproductSlice.reducer;

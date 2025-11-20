import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../utils/axiosInstance.js";

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/user/getusers`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch users");
    }
  }
);

export const userUpdateApi = createAsyncThunk(
  "user/userUpdateApi",
  async (data, { rejectWithValue }) => {
    try {
      console.log("userdata api", data);
      const response = await api.patch(
        `/api/user/updateuser/${data.id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update failed");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    data: [],
    cartItem: [],
  },

  reducers: {
    addIntoCart: (state, action) => {
      state.cartItem.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      // fetch users

      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Users received:", action.payload);
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update users

      .addCase(userUpdateApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(userUpdateApi.fulfilled, (state, action) => {
        state.loading = false;

        const updatedUser = action.payload;

        // Replace the updated user in array
        state.data = state.data.map((item) =>
          item._id === updatedUser._id ? updatedUser : item
        );
      })
      .addCase(userUpdateApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addIntoCart } = userSlice.actions;

export default userSlice.reducer;

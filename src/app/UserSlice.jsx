



// import { createSlice } from "@reduxjs/toolkit";
// import { createAsyncThunk } from "@reduxjs/toolkit";



// export const fetchUsers = createAsyncThunk(
//   "product/fetchUsers",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${serverUrl}/api/user/getusers`);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || "Failed to fetch users");
//     }
//   }
// );

// export const userUpdateApi = createAsyncThunk(
//   "product/userUpdateApi", async(data,{rejectWithValue})=>{

//     try {
//          console.log('update user api', data);

//       const response = await axios.patch(`${serverUrl}/api/user/updateuser/${data._id}`,data);

//       console.log("response from userupdate api",response.meta.arg);



//     } catch (error) {

//           console.log(error);


//     }
//   }
// )


// const userSlice = createSlice({

//      name:'user',
//      initialState: {
//       loading: false,
//       error: null,
//       data: [],
//     },

//     reducers:{


//     },

//     extraReducers: (builder) => {
//       builder

//         .addCase(fetchUsers.pending, (state) => {
//           state.loading = true;
//           state.error = null;
//         })
//         .addCase(fetchUsers.fulfilled, (state, action) => {
//           state.loading = false;
//           console.log("data from action.payload",action.payload)
//           state.user = action.payload;
//         })
//         .addCase(fetchUsers.rejected, (state, action) => {
//           state.loading = false;
//           state.error = action.payload;
//         })


//         .addCase(userUpdateApi.pending,(state)=>{
//           state.loading=true,
//           state.error = null

//      })

//      .addCase(userUpdateApi.fulfilled,(state,action)=>{

//        state.loading = false;
//        const updatedUser = action.payload;




//        state.data = state.data.map((item) =>
//          item._id === updatedUser._id || item.id === updatedUser.id
//            ? updatedUser
//            : item
//        );

//      })

//      .addCase(userUpdateApi.rejected,(state, action)=>{
//        state.loading = false;
//        state.error = action.payload;
//      })



//    }



//   }

// )





// export const {} = userSlice.actions ;

// export default userSlice.reducer ;








import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../App";

// FETCH USERS
export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${serverUrl}/api/user/getusers`);
      return response.data; // Must return array of users
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch users");
    }
  }
);

// UPDATE USER
export const userUpdateApi = createAsyncThunk(
  "user/userUpdateApi",
  async (data, { rejectWithValue }) => {
    try {
      console.log("userdata api",data)
      const response = await axios.patch(
        `${serverUrl}/api/user/updateuser/${data.id}`,
        data
      );
      return response.data; // MUST RETURN updated user!!
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
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // FETCH USERS
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

      // UPDATE USER
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

export default userSlice.reducer;
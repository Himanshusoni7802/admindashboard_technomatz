



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../App";







export const updateProductApi = createAsyncThunk(
  "product/updateUserApi",
  async (userData, { rejectWithValue }) => {
    try {

      console.log("update product api ");
      

      const response = await axios.post(
        `${serverUrl}/api/product/updateproduct/${userData.id}`,
        userData
      );

      console.log("Update API Response:", response.data);


      return response.data.product;

    } catch (err) {
      console.error("Update Error:", err);
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);



export const  deleteProductApi = createAsyncThunk(
    "product/deleteProductApi" , async(id,{rejectWithValue})=>{

        try {

            const response = await axios.delete(`${serverUrl}/api/product/delete/${id}`)

            console.log("delete api from product ",response);

            return response.data.findid ;




        } catch (error) {
            console.log(error)

            return rejectWithValue(error.response?.data || "Something went wrong");


        }
    }
)



const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },

  reducers: {



    deleteProduct: (state, action) => {
      const id = action.payload;
      state.data = state.data.filter(
        (item) => item.id !== id && item._id !== id
      );
    },
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

      .addCase(deleteProductApi.pending,(state)=>{
           state.loading = true,
           state.error = null
      })
      .addCase(deleteProductApi.fulfilled,(state,action)=>{

          state.loading = false ;

          //const deletedId = action.meta.arg ;


        const deleteid = action.payload._id ;




          state.data =  state.data.filter(item => item._id !== deletedId);

      })
      .addCase(deleteProductApi.rejected,(state,action)=>{
             state.loading = false,
             state.error = action.payload

      })


  },
});



export const { addProduct, deleteProduct} = productSlice.actions;
export default productSlice.reducer;

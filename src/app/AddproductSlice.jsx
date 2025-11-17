

import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";


import axios from "axios"


import { serverUrl } from "../App";



export const fetchProducts = createAsyncThunk(
  "addpro/fetchProducts",
  async (_, { rejectWithValue }) => {
   // console.log("==================================")
    try {
      const response = await axios.get(`${serverUrl}/api/product/allproduct`);

      // console.log("-------res",response.data);

      return response.data.findall;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch users");
    }
  }
);



export const createProducts = createAsyncThunk(
   "addpro/createProduct", async(userData,{rejectWithValue}) =>{

    try {

      const response = await axios.post(`${serverUrl}/api/product/createproduct`,userData);

        console.log('response from createProducts',response)

      return response?.data?.data ;


    } catch (error) {

      console.log(error);

      return rejectWithValue(err.response?.data || "Data is not added");


    }
   }
)

export const filterPrducts = createAsyncThunk("addpro/filterProducts",async(data,{rejectWithValue})=>{

  try {

    const response = await axios.get(`${serverUrl}/api/product/findproduct/${data}`);

   // console.log("response from api fil",response.data);

    return response.data


  } catch (error) {

       console.log(error);

  }
}

)




const AddproductSlice = createSlice({

     name:'addpro',
     initialState:{
      loading: false,
      error: null,
      data: [],

     },

     reducers:{

      addFilterData : (state,action)=>{

           // console.log(" --------------------> ",action.payload);

        state.data= action.payload

      }


     },

     extraReducers: (builder)=>{
         builder

         .addCase(fetchProducts.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.loading = false;

          console.log("fetchproducts state",state.data);


          state.data= action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })


        .addCase(createProducts.pending,(state,action)=>{

              state.loading = true,
              state.error = null

        })
        .addCase(createProducts.fulfilled,(state,action)=>{
              state.loading = false ;

              console.log("state from createProducts",state);


             // state.addpro = state?.addpro?.push(action.payload)

            const ds = action.payload;
state?.data?.push(ds);  // without question mark this will give you error

        })

        .addCase(createProducts.rejected,(state,action)=>{
              state.loading = false,
              state.error = action.payload
        })




     }

})


export const {addFilterData} = AddproductSlice.actions;

export default AddproductSlice.reducer;

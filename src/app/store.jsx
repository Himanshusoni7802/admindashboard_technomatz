
import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./ProductSlice.jsx"

import addProductSlice from "./AddproductSlice.jsx";

import userSlice from "./UserSlice.jsx";



const store = configureStore({
     reducer:{
         product: productSlice,
         addpro : addProductSlice,
         user:userSlice


     }
})

export default store ;
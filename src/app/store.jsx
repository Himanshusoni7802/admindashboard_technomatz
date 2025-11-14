
import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./ProductSlice.jsx"

import addProductSlice from "./AddproductSlice.jsx";


const store = configureStore({
     reducer:{
         product: productSlice,
         addpro : addProductSlice,


     }
})

export default store ;
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct, deleteProduct } from "../app/ProductSlice";

import { fetchUsers } from "../app/ProductSlice";

import { useEffect } from "react";
import { useState } from "react";

import { deleteUserApi } from "../app/ProductSlice";


const ProductPage = ()=>{

   // const dispatch = useDispatch();


    const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.product);

   //const dsa = useSelector(state => state);


    // console.log(dsa);


  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;



   //  console.log(data);


   //  const res = useSelector(state=>state)

    // console.log(res);


     //console.log(res.product.val);


     //console.log(res.product.data)


     const productData = data ;

     console.log(productData);




     // console.log(productData);

     //const dispatch = useDispatch() ;







      const deleteProductItem = (id) => {
        console.log("Deleting user:", id);
        dispatch(deleteUserApi(id));
      };










      return (

          <div className="border-2 w-100vw  h-[700px] ">





              <div className="my-10">

              {
                 <div className="flex justify-evenly">
                    <Link to="/create" className="bg-green-600 px-2 py-2 rounded-2xl" >Add product</Link>

                     <Link to ={"/"} className="bg-purple-500 px-2 py-2 rounded-2xl" > Home Page</Link>

                    </div>


              }

               {  productData.map((item) =>(



                  <div className="overflow-x-auto">

                         <table className="min-w-full border border-gray-200 ">
                          <thead>
                           <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Name</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Email</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Role</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Action</th>

                            </tr>


                          </thead>

                          <tbody>
                            <tr className="">
                              <td className="py-4 px-6  text-sm font-medium text-gray-900 border-b border-gray-200">{item.name}</td>
                              <td className="py-4 px-6  text-sm font-medium text-gray-900 border-b border-gray-200" >{item.email}</td>
                              <td className="py-4 px-6  text-sm font-medium text-gray-900 border-b border-gray-200">{item.role}</td>
                              <td className="py-4 px-6  text-sm font-medium text-gray-900 border-b border-gray-200">
                                <Link to={`/update/${item._id}`} className="bg-blue-500 px-2  items-center mx-4">Update</Link>
                                <button className="bg-red-600 mx-5" onClick={()=>deleteProductItem(item._id)}>Delete</button>
                              </td>

                            </tr>

                            </tbody>
                      </table>

                    </div>
                 ))

              }

            </div>

          </div>
      )
}

export default ProductPage;

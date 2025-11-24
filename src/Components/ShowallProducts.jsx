import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, filterPrducts } from "../app/AddproductSlice";

import { addFilterData } from "../app/AddproductSlice";
import { deleteProductApi } from "../app/ProductSlice";



import { Link } from "react-router-dom";

import { toast } from "react-hot-toast";

import Pagination from "../Components/Pagination.jsx" ;




const ShowallProducts = () => {
  const [inp, setInput] = useState("");

  const dispatch = useDispatch();


  const { data, loading, error } = useSelector((state) => state.addpro);

  const dataperpages = 5 ;
  let totalpages =  Math.ceil(data.length / dataperpages) ;






  const [currentpage,setCurrentPage] = useState(1) ;


  let lastindex = totalpages * currentpage ;

  let firstindex = lastindex - totalpages ;


  let content = data.slice(firstindex,lastindex);


  //console.log("content",content);








  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const searchItem = async (text) => {
    if (!text || text.trim() === "") return;

    try {
      const result = await dispatch(fetchProducts(text));

      if (result.payload) {
        dispatch(addFilterData(result.payload));
      } else {
        return <div>No Product found from this category </div>;
      }
    } catch (error) {
      console.log(error);
    }
  };





  return (
    <div>
      <Link className="bg-green-500 px-3 py-3 rounded-2xl my-12" to="/admin">
        Go back
      </Link>

      <div className="w-full px-20 py-10">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold mb-4 text-center">All Products</h1>

          <div>
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter search Item"
              className="outline outline-1"
            ></input>
            <button
              onClick={() => searchItem(inp)}
              className="mx-5 bg-green-500 py-2 px-2 rounded"
            >
              Find Product
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          <Pagination totalpages = {totalpages} currentpage={currentpage} setCurrentPage={setCurrentPage} content={content} />


          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowallProducts;

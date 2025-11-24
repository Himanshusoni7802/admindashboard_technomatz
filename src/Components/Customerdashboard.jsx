import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";

import { CgProfile } from "react-icons/cg";

import { addFilterData, fetchProducts } from "../app/AddproductSlice";

import { Link } from "react-router-dom";
import { addIntoCart } from "../app/UserSlice";
import toast from "react-hot-toast";
import CustomerPagination from "./CustomerPagination";

const Customerdashboard = () => {
  const dispatch = useDispatch();

  const [inp, setInput] = useState("");
  const { data, loading, error } = useSelector((state) => state.addpro);

  console.log("data from customer",data)

  const addTocartButton = (item) => {
    console.log("addinto cart from customer ");
    dispatch(addIntoCart(item));

    toast.success("Product is added into the cart ");
  };

  useEffect(() => {
    console.log("data fetched ");

    dispatch(fetchProducts());
  }, []);

  const searchItem = async (text) => {
    if (!text || text.trim() === "") return; // ignore empty search

    try {
      const result = await dispatch(fetchProducts(text));

      if (result.payload) {
        dispatch(addFilterData(result.payload));
      } else {
        console.log("Item not found");
        return <div>Item not found</div>;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const AllData = data?.findall ? data?.findall : data;

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;


  const [currentpage,setCurrentPage] = useState(1) ;

  const datapages = 5;

  let totalpages = Math.ceil(AllData.length / datapages)  ;

 // console.log("totalpages",totalpages)

 let lastindex = totalpages * currentpage ;

 let firstindex = lastindex - totalpages ;


 let content = data.slice(firstindex,lastindex) ;





  return (
    <div>
      <nav className="w-full bg-sky-200 h-10 relative ">
        <Link to="/profile" className="absolute right-3 top-1">
          <CgProfile size={30} />
        </Link>

        <Link to="/cart">Cart page</Link>
      </nav>

      <div className="w-full px-20 py-10">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold mb-4">All Products</h1>

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

          <div className="">
            {/* {AllData?.length > 0 &&
              AllData?.map((item) => (
                <div
                  key={item._id}
                  className="border rounded-xl p-4 shadow hover:shadow-lg transition-all duration-200 bg-white"
                >
                  <h2 className="text-xl font-semibold">{item.name}</h2>

                  <p className="text-gray-600 text-sm my-2">
                    {item.description}
                  </p>

                  <p className="text-gray-700 font-medium">
                    Category:{" "}
                    <span className="text-amber-700">{item.category}</span>
                  </p>

                  <p className="text-green-600 font-bold text-lg mt-2">
                    ₹{item.price}
                  </p>

                  <button
                    onClick={() => addTocartButton(item)}
                    className="bg-blue-400 px-3 py-2 rounded-xl"
                  >
                    Add to cart
                  </button>
                </div>
              ))} */}

                   <CustomerPagination totalpages = {totalpages} currentpage={currentpage} setCurrentPage={setCurrentPage} content = {content}/>




          </div>
        </div>
      </div>
    </div>
  );
};

export default Customerdashboard;

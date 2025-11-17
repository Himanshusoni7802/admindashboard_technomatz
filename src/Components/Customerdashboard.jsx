import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";

import {
  addFilterData,
  fetchProducts,
  filterPrducts,
} from "../app/AddproductSlice";

const Customerdashboard = () => {
  const dispatch = useDispatch();

  const [inp, setInput] = useState("");
  const { data, loading, error } = useSelector((state) => state.addpro);

  console.log("888888888888", data);


  useEffect(() => {
     console.log("data fetched ")
    dispatch(fetchProducts());

  }, []);



  const searchItem = async (text) => {
    if (!text || text.trim() === "") return; // ignore empty search

    try {
      const result = await dispatch(filterPrducts(text));

     // console.log(result);


      if (result.payload) {
        dispatch(addFilterData(result.payload));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   searchItem();
  // }, []);

const AllData=data?.findall?data?.findall:data

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {AllData?.length > 0 &&
           AllData?.map((item) => (
              <div
                key={item._id}
                className="border rounded-xl p-4 shadow hover:shadow-lg transition-all duration-200 bg-white"
              >
                <h2 className="text-xl font-semibold">{item.name}</h2>

               

                <p className="text-gray-600 text-sm my-2">{item.description}</p>

                <p className="text-gray-700 font-medium">
                  Category:{" "}
                  <span className="text-amber-700">{item.category}</span>
                </p>

                <p className="text-green-600 font-bold text-lg mt-2">
                  ₹{item.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Customerdashboard;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, filterPrducts } from "../app/AddproductSlice";

import { addFilterData } from "../app/AddproductSlice";
import { deleteProductApi } from "../app/ProductSlice";

import { MdDelete } from "react-icons/md";

import { HiOutlinePencil } from "react-icons/hi";

import { Link } from "react-router-dom";

import { toast } from "react-hot-toast";

const ShowallProducts = () => {
  const [inp, setInput] = useState("");

  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.addpro);

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

  const handleDeleteProduct = async (id) => {
    // console.log(id) ;

    await dispatch(deleteProductApi(id));

    toast.success("Item is deleted Successfully ");

    await dispatch(fetchProducts());
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
            {data?.length > 0 ? (
              data?.map((item) => (
                <div
                  key={item._id}
                  className="border rounded-xl p-4 shadow hover:shadow-lg transition-all duration-200 bg-white relative"
                >
                  <h2 className="text-xl font-semibold">{item.name}</h2>

                  <div className="flex absolute  right-5 gap-8">
                    <button title="delete" onClick={() => handleDeleteProduct(item._id)}>
                      <MdDelete size={20} />
                    </button>

                    <Link to={`/update/product/${item._id}`}>
                      <HiOutlinePencil title="update" size={20} />
                    </Link>
                  </div>

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
                </div>
              ))
            ) : (
              <div>No Product Found from this category </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowallProducts;

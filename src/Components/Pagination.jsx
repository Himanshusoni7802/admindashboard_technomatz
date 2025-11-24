import { MdDelete } from "react-icons/md";

import { HiOutlinePencil } from "react-icons/hi";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { deleteProductApi } from "../app/ProductSlice";

import {toast}  from "react-hot-toast";

import { fetchProducts} from "../app/AddproductSlice";










const Pagination = ({ totalpages, currentpage, setCurrentPage, content }) => {
  function renderBtn() {
    let btn = [];

    for (let i = 1; i <= totalpages; i++) {
      btn.push(
        <button
          onClick={() => setCurrentPage(i)}
          className={`${
            currentpage === i ? "bg-blue-600" : "bg-blue-400"
          }  flex  relative top-20 mx-10 left-20 text-white px-4 py-2 rounded-lg font-semibold`}
        >
          {i}
        </button>
      );
    }

    return btn;
  }


  const dispatch = useDispatch() ;



  const handleDeleteProduct = async (id) => {
    // console.log(id) ;

    await dispatch(deleteProductApi(id));

    toast.success("Item is deleted Successfully ");

    await dispatch(fetchProducts());
  };












  return (
    <div className="flex flex-col  gap-10 relative">
      <div className="flex gap-20 w-[400px] ">
        {content.map((item) => (
                 <div
                 key={item._id}
                 className="border  rounded-xl p-8 px-10 mx-8 shadow hover:shadow-lg transition-all duration-200 bg-white relative"
               >
                 <h2 className="text-xl font-semibold">{item.name}</h2>

                 <div className="flex absolute  right-2 gap-3">
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
        ))}
      </div>

      <div className="relative flex ">
        <button
          disabled={currentpage === 1}
          onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1))}
          className="bg-blue-500 disabled:opacity-50 absolute top-20 text-white px-4 py-2 rounded-lg font-bold"
        >
          prev
        </button>

        {renderBtn()}
        <button
          disabled={currentpage === totalpages}
          onClick={() =>
            setCurrentPage((prev) =>
              prev < totalpages ? prev + 1 : totalpages
            )
          }
          className="bg-blue-500 absolute top-20 left-150 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-bold"
        >
          next
        </button>
      </div>
    </div>
  );
};

export default Pagination;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { updateProductApi } from "../app/ProductSlice";

import {toast} from "react-hot-toast";


const ProductUpdate = () => {
  const { id } = useParams();

  console.log(id);


  console.log(id);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.addpro);




    



  console.log("product update page data ",data);


  const [uname, setUname] = useState("");

  const [uprice, setUprice] = useState(0);

  const [ucategory, setUcategory] = useState("");

  const [udescription, setUdescription] = useState("");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data.length > 0) {
      const existProduct = data.find((item) => item?._id === id)

      if (existProduct) {
        setUname(existProduct.name);
        setUprice(existProduct.price);

        setUcategory(existProduct.category);

        setUdescription(existProduct.description);
      }

      //   console.log("------->",uname,uprice,ucategory,udescription)
    }
  }, [data, id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!uname || !uprice || !ucategory || !udescription) {
      alert("Please fill all fields");

      return;
    }

    try {
      setSaving(true);

      const result = await dispatch(
        updateProductApi({
          id: id,
          name: uname,
          price: uprice,
          category: ucategory,
          description: udescription,
        })
      );

      //console.log(" User updated:", result);


      // alert("User updated successfully!");
      toast.success("Product is added successfully ");


      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-9 my-10">
      <form onSubmit={submitHandler} className="flex flex-col gap-3">
        <label>Name</label>
        <input
          className="outline outline-1 p-2"
          type="text"
          placeholder="Enter product name"
          onChange={(e) => setUname(e.target.value)}
          value={uname}
        />

        <label>Price</label>
        <input
          className="outline outline-1 p-2"
          type="number"
          placeholder="Enter price"
          onChange={(e) => setUprice(e.target.value)}
          value={uprice}
        />

        <label>Category</label>
        <input
          className="outline outline-1 p-2"
          type="text"
          placeholder="Enter category"
          onChange={(e) => setUcategory(e.target.value)}
          value={ucategory}
        />

        <label>Description</label>
        <input
          className="outline outline-1 p-2"
          type="text"
          placeholder="Enter category"
          onChange={(e) => setUdescription(e.target.value)}
          value={udescription}
        />

        <button
          type="submit"
          disabled={saving}
          className={`${
            saving ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white py-2 px-4 mt-3 rounded`}
        >
          {saving ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductUpdate;

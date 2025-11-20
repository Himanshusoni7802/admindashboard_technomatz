import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { addProduct } from "../app/ProductSlice";
import { useNavigate } from "react-router-dom";
import { createProducts } from "../app/AddproductSlice";

import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import { toast } from "react-hot-toast";

const CreateProduct = () => {
  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");

  const [price, setPrice] = useState(0);

  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const res = useSelector((state) => state);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !description || !category || !price) {
      toast.error("All fields is required ");
      return;
    }

    const cat = category.toLowerCase();

    try {
      setSaving(true);

      const result = await dispatch(
        createProducts({
          name,
          price,
          category: cat,
          description,
        })
      );

      toast.success("Product is Added successfully ");

      navigate("/products");
    } catch (error) {
      console.log("Error occured ", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="my-4"> Add Product </h1>

      <div className="mx-5  flex gap-1 border-1 w-[150px] h-[40px] rounded-xl bg-gray-500 text-white px-5 py-3">
        <Link to="/admin" className="flex ">
          {" "}
          <FaArrowLeft /> Go back
        </Link>
      </div>

      <form
        onSubmit={submitHandler}
        className="mx-9 my-3  flex flex-col gap-5 w-[40%] shadow-2xl rounded-xl p-8  items-center"
      >
        <div className="flex flex-col  gap-5">
          <label className="font-medium mb-1">Product Name</label>
          <input
            className="outline p-2 border rounded"
            type="text"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>

        <div className="flex flex-col gap-5 ">
          <label className="font-medium mb-1">Description</label>
          <input
            className="outline  p-2 border rounded"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-medium mb-1  ">Price</label>
          <input
            className="outline p-2 border rounded "
            type="number"
            onChange={(e) => setPrice(e.target.value)}
          ></input>
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-medium mb-1">Category</label>
          <input
            className="outline p-2 border rounded"
            type="text"
            onChange={(e) => setCategory(e.target.value)}
          ></input>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-green-700 px-3 py-2 rounded-2xl w-[60px] flex justify-center"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>

      {/* --------------------------------------------------------------gpt*/}
    </div>
  );
};

export default CreateProduct;

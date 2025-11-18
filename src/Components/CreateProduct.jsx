import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { addProduct } from "../app/ProductSlice";
import { useNavigate } from "react-router-dom";
import { createProducts } from "../app/AddproductSlice";

import {toast} from "react-hot-toast"

const CreateProduct = () => {
  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");

  const [price, setPrice] = useState(0);

  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  //   const navigate = useNavigate();

  const res = useSelector((state) => state);

  console.log("res---------------------",res);



  const submitHandler = async (e) => {
    e.preventDefault();

   // console.log(name + price + category + description);

    if (!name || !description || !category || !price) {
      alert("All fields is required ");
      return;
    }

    try {
      setSaving(true);

      const result = await dispatch(
        createProducts({
          name,
          price,
          category,
          description,
        })
      );

   


       toast.success("Product is Added successfully ");

       navigate("/products");

    } catch (error) {
      console.log("Error occured ",error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="mx-150"> Add Product </h1>
      <form
        onSubmit={submitHandler}
        className="mx-9 my-10  flex flex-col gap-3"
      >
        <label>Name</label>
        <input
          className="outline outline-1 p-2"
          type="text"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <label>Description</label>
        <input
          className="outline outline-1 p-2"
          type="text"
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <label>Price</label>
        <input
          className="outline outline-1"
          type="number"
          onChange={(e) => setPrice(e.target.value)}
        ></input>

        <label>Category</label>
        <input
          className="outline outline-1"
          type="text"
          onChange={(e) => setCategory(e.target.value)}
        ></input>

        <button
          className="bg-green-700 px-3 py-2 rounded-2xl w-[60px]"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;

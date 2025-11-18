import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addProduct, deleteProduct } from "../app/ProductSlice";

import {toast} from "react-hot-toast";




//import { deleteUserApi } from "../app/ProductSlice";

const ProductPage = () => {
  // const dispatch = useDispatch();

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.product);

  const navigate = useNavigate();




  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  const productData = data;

  console.log("productData",productData);



  const deleteProductItem = (id) => {
    console.log("Deleting user:", id);
    dispatch(deleteUserApi(id));
  };


  const logout = ()=>{

        localStorage.clear();

        toast.success("Admin logout successfully");


        navigate('/');

  }



  return (
    <div className="border-2 w-100vw  h-[700px] ">

        {/* {
          <div className="flex justify-evenly">
            <Link to="/create" className="bg-green-600 px-2 py-2 rounded-2xl">
              Add product
            </Link>

            <Link to={"/"} className="bg-purple-500 px-2 py-2 rounded-2xl">
              {" "}
              Home Page
            </Link>
          </div>
        } */}


        <div className="bg-amber-700 w-screen h-7">
            <nav className=" flex justify-around gap-3">

              <Link to="/view">View Users</Link>

              <Link to="/products">Show all Products</Link>

              <Link to='/create'>Create</Link>

              <button onClick={logout}>logout</button>
            </nav>
        </div>








    </div>
  );
};

export default ProductPage;

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.product);

  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const productData = data;

  const logout = () => {
    localStorage.clear();

    toast.success("Admin logout successfully");

    navigate("/");
  };

  return (
    <div className="border-2 w-100vw  h-[700px] flex flex-col  ">
      <div className="bg-amber-700  h-7 w-full h-[60px]">
        <nav className=" flex justify-around gap-3 items-center px-7 py-1">
          <Link
            className="hover:bg-gray-500 text-white px-3 rounded-xl"
            to="/view"
          >
            View Users
          </Link>

          <Link
            className="hover:bg-gray-500 text-white px-3 rounded-xl"
            to="/products"
          >
            Show all Products
          </Link>

          <Link
            className="hover:bg-gray-500 text-white px-3 rounded-xl"
            to="/create"
          >
            Create
          </Link>

          <button
            className="cursor-pointer hover:bg-gray-400 px-3 py-3 text-white rounded-xl "
            onClick={logout}
          >
            logout
          </button>
        </nav>
      </div>

      <div className="flex items-center justify-center my-12 text-2xl text-gray-500 text-shadow-amber-300">
        <h1>Welcome to Admin Dashboard </h1>
      </div>
    </div>
  );
};

export default ProductPage;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../app/UserSlice";

import { Link } from "react-router-dom";

import  {FaArrowLeft}  from "react-icons/fa"


const ViewUsers = () => {
  const dispatch = useDispatch();

  // Select your slice correctly (example: user slice)
  const { data, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="w-screen h-[500px] p-5">
      <h1 className="text-2xl font-bold mb-4">View Users</h1>

      <div className="mx-5 my-10 flex gap-1 border-1 w-[150px] h-[40px] rounded-xl bg-gray-500 text-white px-5 py-3">
        <Link to="/admin" className="flex ">
          {" "}
          <FaArrowLeft /> Go back
        </Link>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {data && data.length > 0 && (
        <table className="border-collapse border border-gray-400 w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 p-2">Name</th>
              <th className="border border-gray-400 p-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-400 p-2">{item.name}</td>
                <td className="border border-gray-400 p-2">{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewUsers;
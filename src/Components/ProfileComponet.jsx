import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";

import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";

import { useState } from "react";

import { RiInformationFill } from "react-icons/ri";

import { ImCross } from "react-icons/im";




const ProfileComponent = () => {
  const user = localStorage.getItem("user");

  const data = JSON.parse(user);

  const navigate = useNavigate();

  const { state } = useSelector((state) => state.user);

  const [showdata, setShowData] = useState(false);

  const logoutUser = () => {
    localStorage.clear();

    toast.success("User logout successfully");

    navigate("/");
  };

  return (
    <div>
      <div className="mx-5 my-10 flex gap-1 border-1 w-[150px] h-[40px] rounded-xl bg-gray-500 text-white px-5 py-3">
        <Link to="/customer" className="flex ">
          {" "}
          <FaArrowLeft /> Go back
        </Link>
      </div>

      <div>
        <h1 className="text-center my-10">Your Profile Page</h1>{" "}
      </div>

      <div className="grid grid-cols-2 gap-x-0 gap-y-0  mx-30 my-15">
        { showdata ?
          <div class="w-[400px] h-[200px] border border-gray-300 flex items-center justify-center relative">
          <div class="absolute top-0 left-1/2 mt-2 text-lg font-semibold">Data</div>
          <div className="absolute top-2 right-2 cursor-pointer">
          <ImCross title="cross" onClick={()=>setShowData(!showdata)} />
            </div>
          <div class="flex flex-col gap-3">
            <div class="flex gap-7 ">
              <h4 class="font-medium text-gray-700">Name</h4>:
              <p class="text-gray-900">{data.name}</p>
            </div>
            <div class="flex gap-7 ">
              <h4 class="font-medium text-gray-700">Email</h4>:
              <p class="text-gray-900">{data.email}</p>
            </div>
            <div class="flex gap-7">
              <h4 class="font-medium text-gray-700">Role</h4>:
              <p class="text-gray-900">{data.role}</p>
            </div>
          </div>
        </div>  :

             <div><RiInformationFill title="your information" onClick={()=>setShowData(!showdata)} size={50} title="show your information" /></div>
        }

        <div className="w-[500px] h-[100px]  flex  justify-evenly shadow-2xl roounded-2xl ">
          <Link
            className="my-9 bg-blue-500 px-5  rounded-2xl text-center"
            to={{ pathname: "/updateuserinfo" }}
          >
            Update info
          </Link>

          <div>
            <button
              className="bg-red-500 px-2 w-20 rounded-2xl text-white my-9 py-3"
              onClick={logoutUser}
            >
              Logout
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;

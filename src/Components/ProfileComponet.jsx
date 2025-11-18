import { Link, useNavigate } from "react-router-dom";

import {toast} from "react-hot-toast"

import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";


const ProfileComponent = () => {
  const user = localStorage.getItem("user");

  const data = JSON.parse(user);


  const navigate = useNavigate();


  const {state} = useSelector(state=>state.user) ;

  console.log("profile component",state);




  console.log('data from profile component',data);

  const logoutUser=()=>{

      localStorage.clear();

    toast.success("User logout successfully");


      navigate('/');


  }


  return (

      <div>
          <div className="mx-5 my-10 flex gap-1 border-1 w-[150px] h-[40px] rounded-xl bg-gray-500 text-white px-5 py-3">
             <Link to='/customer' className="flex "> <FaArrowLeft/> Go back</Link>
          </div>

          <div>
           <h1 className="text-center my-10">Your Profile Page</h1>    </div>
    <div className="grid grid-cols-2 gap-x-0 gap-y-0  mx-30 my-15">

      <div className="w-[500px] h-[200px] border-1 flex items-center justify-center ">

               <div className="absolute top-50">Data</div>
            <div className="flex flex-col">

                <div className="flex gap-7">
                   <h4>Name</h4>: <p>{data.name}</p>
                </div>

                <div className="flex gap-7">
                   <h4>Email</h4>: <p>{data.email}</p>
                </div>

                <div className="flex gap-7">
                   <h4>Role</h4>: <p>{data.role}</p>
                </div>



            </div>

      </div>

      <div className="w-[500px] h-[100px]  flex  justify-evenly shadow-2xl roounded-2xl ">


        <Link className="my-9 bg-blue-500 px-5  rounded-2xl text-center" to={{ pathname: "/updateuserinfo" }}>
          Update info
        </Link>

       <div>
        <button className="bg-red-500 px-2 w-20 rounded-2xl text-white my-9 py-3" onClick={logoutUser}>Logout</button>  </div>
      </div>
    </div>

    </div>


  );
};

export default ProfileComponent;

import { useState } from "react";
import { userUpdateApi } from "../app/UserSlice";
import { useDispatch } from "react-redux";

import {Link} from "react-router-dom"

const ProfileUpdate = () => {
  // Extract the passed state

  const data = localStorage.getItem("user");

  const res = JSON.parse(data);

  const { id, name, email, role } = res;

  const dispatch = useDispatch();

  // console.log(name,email,role)

  //console.log(res,typeof(res));

  const [uname, setUname] = useState(name);

  const [uemail, setUemail] = useState(email);

  const [urole, setUrole] = useState(role);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!uname || !uemail || !urole) {
      alert("Please fill all fields");
      return;
    }

    try {
      const result = await dispatch(
        userUpdateApi({
          id: id,
          name: uname,
          email: uemail,
          role: urole,
        })
      );

      // alert("User updated successfully!")

      console.log(" User updated:", result);
      alert("User updated successfully!");

      //navigate("/admin");
    } catch (err) {
      console.error(" Update failed:");
      alert("Error updating user: " + err);
    } finally {
    }
  };

  return (
    <div className=" shadow-xl  rounded-3xl flex flex-col my-25 mx-80 w-[500px] h-[400px] justify-center items-center relative">

         <Link className="absolute  top-0 left-10" to='/customer'>Go to user dashboard</Link>

      <div className="text-center flex items-center justify-center">
        <h1 className="underline bold">Update User Info</h1>{" "}
      </div>

      <div className="flex justify-center items-center">

      <form onSubmit={handleSubmit} className="relative">
        <div>
          <label htmlFor="name" className="font-bold">Update Name</label>
          <input
            onChange={(e) => setUname(e.target.value)}
            className="outline-2 mx-5 my-5"
            type="text"
            placeholder="enter update name"
            value={uname}
          ></input>
        </div>

        <div>
          <label htmlFor="email" className="font-bold">Update Email</label>
          <input
            onChange={(e) => setUemail(e.target.value)}
            className="outline-2 mx-5 my-5"
            type="text"
            placeholder="enter update name"
            value={uemail}
          ></input>
        </div>

        <div>
          <label htmlFor="role" className="font-bold">Update Role</label>
          <input
            onChange={(e) => setUrole(e.target.value)}
            className="outline-2 mx-8 my-5"
            type="text"
            placeholder="enter update name"
            value={urole}
          ></input>
        </div>

        <button className="absolute left-45 bg-blue-800 rounded-2xl px-4 py-4 text-white" type="submit">Update</button>
      </form>

      </div>

    </div>
  );
};

export default ProfileUpdate;

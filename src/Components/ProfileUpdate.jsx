import { useState } from "react";
import { userUpdateApi } from "../app/UserSlice";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import { toast } from "react-hot-toast";

import { useNavigate } from "react-router-dom";

const ProfileUpdate = () => {
  const data = localStorage.getItem("user");

  const res = JSON.parse(data);

  const { _id, name, email, role } = res;

  const dispatch = useDispatch();

  const navigate = useNavigate();

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
          id: _id,
          name: uname,
          email: uemail,
          role: urole,
        })
      );

      console.log(" User updated:", result);
      toast.success("User updated successfully!");

      const obj = result.payload.user;

      localStorage.setItem("user", JSON.stringify(obj));

      navigate("/profile");
    } catch (err) {
      console.error(" Update failed:");
      alert("Error updating user: " + err);
    } finally {
    }
  };

  return (
    <div className=" shadow-xl  rounded-3xl flex flex-col my-25 mx-80 w-[500px] h-[400px] justify-center items-center relative">
      <Link className="absolute  top-0 left-10" to="/customer">
        Go to user dashboard
      </Link>

      <div className="text-center flex items-center justify-center">
        <h1 className="underline bold">Update User Info</h1>{" "}
      </div>

      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex gap-5">
            <label className="font-semibold mb-1" htmlFor="name">
              Update Name
            </label>
            <input
              onChange={(e) => setUname(e.target.value)}
              className="outline border rounded p-2 mb-3"
              type="text"
              placeholder="enter update name"
              value={uname}
            ></input>
          </div>

          <div>
            <label htmlFor="email" className="font-semibold mb-1">
              Update Email
            </label>
            <input
              onChange={(e) => setUemail(e.target.value)}
              className="outline p-2 border rounded"
              type="text"
              placeholder="enter update name"
              value={uemail}
            ></input>
          </div>

          <div>
            <label htmlFor="role" className="font-semibold mb-1">
              Update Role
            </label>
            <input
              onChange={(e) => setUrole(e.target.value)}
              className="outline-2 mx-8 my-5"
              type="text"
              placeholder="enter update name"
              value={urole}
            ></input>
          </div>

          <button
            className="absolute left-45 bg-blue-800 rounded-2xl px-4 py-4 text-white"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;

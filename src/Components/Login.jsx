import { useState } from "react";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { FaEye } from "react-icons/fa";

import { FaEyeSlash } from "react-icons/fa";

import Axios from "axios";

import { serverUrl } from "../App";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showpassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e, currentRole) => {
    e.preventDefault();

    try {
      const payload = {
        role: currentRole,
        email,
        password,
      };
      const response = await axios.post(`${serverUrl}/api/user/login`, payload);



      console.log("response data from login", response.data);

      const { token, user, role } = response.data;

     // console.log("access token",token);


      const value = {
        role,
        ...user,
      };


      console.log("role",role , "token",token)


     // console.log("token from login",token)

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(value));

      if (role === "admin") {
        toast.success(response.data.message + " " + `${role}`);

        navigate("/admin");
      } else if (role === "user") {
        toast.success(response.data.message + " " + `${role}`);
        navigate("/customer");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showpassword);
  };

  return (
    <div className="flex justify-center">
      {/*-------------------------------------------   */}

      <form
        onSubmit={handleSubmit}
        className="mx-9 my-10  flex flex-col gap-5 w-[40%] shadow-2xl rounded-xl p-8  items-center"
      >
        <h1 className="bg-blue-500 w-28 text-white rounded-2xl text-center py-2">
          Login
        </h1>

        <div className="flex flex-col  gap-5">
          <label className="font-medium mb-1">Email</label>
          <input
            placeholder="Enter your Email"
            className="outline p-2 border rounded"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <div className="flex flex-col gap-5 ">
          <label className="font-medium mb-1">Password</label>
          <input
            placeholder="Enter your Password"
            className="outline  p-2 border rounded"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        <div>
          <button
            type="submit"
            className="bg-green-600 px-4 my-3 mx-2 py-3 rounded-2xl"
            px-
            onClick={(e) => handleSubmit(e, "admin")}
          >
            Login as Admin
          </button>

          <button
            type="submit"
            className="bg-green-600 px-4 my-3 mx-2 py-3 rounded-2xl"
            onClick={(e) => handleSubmit(e, "user")}
          >
            Login as Customer
          </button>
        </div>

        <div className="flex ">
          <div className="flex flex-col items-center">
            <p className="text-center">Do not have an account </p>

            <Link
              className="bg-green-700 px-6 py-3 w-[100px] rounded-2xl mx-30 my-3 text-center"
              to={"/signup"}
            >
              Signup
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

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

      const value = {
        role,
        ...user,
      };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(value));

      // redirect based on backend-confirmed role
      if (role === "admin") {
        // console.log("===== admin role",role)
        // console.log("currentRole",currentRole)
        toast.success(response.data.message + " " +  `${role}`);

        navigate("/admin");
      } else if (role === "user") {

        toast.success(response.data.message + " " + `${role}`);
        navigate("/customer");
      }
    } catch (error) {

      toast.error(error.response?.data?.message);

      //alert(error.response?.data?.message || "Login failed");
    }
  };

  const togglePassword = () => {
    setShowPassword(!showpassword);
  };

  return (
    <div className="shadow-2xl w-[450px] h-[500px] flex justify-center items-center mx-[30%]">
      <form>
        <div className="flex flex-col justify-center items-center">
          <div>
            <label htmlFor="email">Email</label>
            <input
              required
              onChange={(e) => setEmail(e.target.value)}
              className="outline mx-3 my-3"
              type="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex  relative   ">
            <label htmlFor="pass" className="my-2">
              Password
            </label>
            <input
              required
              onChange={(e) => setPassword(e.target.value)}
              className="outline mx-3 my-3 w-[40]"
              type={showpassword ? "text" : "password"}
              id="pass"
              placeholder="Enter your Password"
            />
            {showpassword ? (
              <FaEye
                className="my-3 absolute right-5"
                onClick={togglePassword}
              />
            ) : (
              <FaEyeSlash
                className="my-3 absolute right-5"
                onClick={togglePassword}
              />
            )}
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

            <div className="flex ">
              {/* <Link className="bg-green-700 px-3 py-3 my-6  mx-[0%] w-[100px] rounded-2xl " to={'/signup'} >Signup </Link> */}

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
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

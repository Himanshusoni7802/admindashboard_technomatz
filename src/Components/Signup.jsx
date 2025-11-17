import { useState } from "react";

import  { Link }  from "react-router-dom"

import Axios from "axios";
import { serverUrl } from "../App";

import { FaEye } from "react-icons/fa";

import { FaEyeSlash } from "react-icons/fa";





const Signup = ()=>{



    const [email,setEmail] = useState("");

    const [password,setPassword] = useState("");

    const [name,setName] = useState("") ;

    const [role,setRole] = useState(" ");

    const [showpassword,setShowPassword] = useState(false);





      const handleSubmit = async(e)=>{

            e.preventDefault();



            try {


            const data = await Axios.post(`${serverUrl}/api/user/register`,{name,email,password,role})

            console.log(data);




            } catch (error) {

            }




      }


      const togglePassword = ()=>{

        setShowPassword(!showpassword);

  }




      return(

        <div className=" shadow-2xl w-[450px] h-[500px] flex justify-center items-center mx-[30%] my-[4%]  rounded-xl">


          <form onSubmit={handleSubmit} >


                   <div className="flex flex-col justify-center items-center">

                     <h1 className="bg-blue-500 w-28 text-white rounded-2xl text-center py-2">Sign up</h1>
                   <div>
                    <label htmlFor="name" >Name</label>
                    <input onChange={(e)=> setName(e.target.value)} className="outline-2 w-[300px] mx-3 my-3" type="text" id="name" placeholder="Enter your Name" />

                    </div>


                    <div>
                    <label htmlFor="email" >Email</label>
                    <input onChange={(e)=> setEmail(e.target.value)} className="outline-2 w-[300px] mx-3 my-3" type="email" id="email" placeholder="Enter your email" />

                    </div>




                  <div  className="relative">

                  {/* <input  onChange={(e)=>setPassword(e.target.value)} className="outline mx-3 my-3 w-[40] " type="password" id="pass" placeholder="Enter your Password" /> */}

                  <label htmlFor="pass" className="my-2 mx-1" >Password</label>
                  <input required onChange={(e)=>setPassword(e.target.value)} className="outline-2 w-[300px] mx-1 my-3 w-[40]" type={ showpassword ? "text" : "password"} id="pass" placeholder="Enter your Password" />
                  {
                      showpassword ? <FaEye className="my-3 absolute top-1 right-6" onClick={togglePassword}/> : <FaEyeSlash className="my-3 absolute top-1 right-6" onClick={togglePassword}/>
                  }

                  </div>


                  <div>
                    <label htmlFor="role" >Role</label>
                    <input onChange={(e)=> setRole(e.target.value)} className="outline-2 w-[300px] mx-3 my-3" type="text" id="role" placeholder="Enter your role" />

                    </div>



                 <div>

                <button type="submit" className="bg-green-600 px-6 py-3  mx-30  rounded-2xl">Signup</button>

                 <p className="my-4 text-center">Have an account login please</p>
                 <div className="flex items-center">
                <Link className="bg-green-700 px-6 py-3 w-[100px] rounded-2xl mx-30 my-3 text-center" to={'/login'} >Login </Link>


                </div>




                </div>

            </div>





          </form>

          </div>
      )
}


export default Signup ;

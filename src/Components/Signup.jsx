import { useState } from "react";

import  { Link }  from "react-router-dom"

import Axios from "axios";
import { serverUrl } from "../App";





const Signup = ()=>{



    const [email,setEmail] = useState("");

    const [password,setPassword] = useState("");

    const [name,setName] = useState("") ;

    const [role,setRole] = useState(" ");




      const handleSubmit = async(e)=>{

            e.preventDefault();



            try {


            const data = await Axios.post(`${serverUrl}/api/user/register`,{name,email,password,role})

            console.log(data);




            } catch (error) {

            }




      }




      return(

        <div className="border-2 w-[500px] h-[600px] flex justify-center items-center mx-50">


          <form onSubmit={handleSubmit} >


                   <div className="flex flex-col justify-center items-center">


                   <div>
                    <label htmlFor="name" >Name</label>
                    <input onChange={(e)=> setName(e.target.value)} className="outline mx-3 my-3" type="text" id="name" placeholder="Enter your Name" />

                    </div>


                    <div>
                    <label htmlFor="email" >Email</label>
                    <input onChange={(e)=> setEmail(e.target.value)} className="outline mx-3 my-3" type="email" id="email" placeholder="Enter your email" />

                    </div>




                  <div>
                 <label htmlFor="pass" >Password</label>
                  <input  onChange={(e)=>setPassword(e.target.value)} className="outline mx-3 my-3 w-[40]" type="password" id="pass" placeholder="Enter your Password" />

                  </div>


                  <div>
                    <label htmlFor="role" >Role</label>
                    <input onChange={(e)=> setRole(e.target.value)} className="outline mx-3 my-3" type="text" id="role" placeholder="Enter your role" />

                    </div>



                 <div>

                <button type="submit" className="bg-green-600 px-2 my-3 mx-2">Signup</button>

                 <p className="my-4">Have an account login please</p>
                <Link className="bg-green-700 px-3 py-3 w-[100px] rounded-2xl my-8" to={'/login'} >Login </Link>




                </div>

            </div>





          </form>

          </div>
      )
}


export default Signup ;

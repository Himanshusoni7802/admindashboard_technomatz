
import axios from "axios" ;

import { serverUrl } from "../App";








export const  fetchApiUser = async()=>{

         try {

             const data = await axios.get(`${serverUrl}/api/user/getusers`);


             return data ;





         } catch (error) {

             console.log(error)
         }
}


import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const ViewUsers = ()=>{

    const dispatch = useDispatch() ;

     const res = useSelector(state=>state.product) ;

     console.log("data from view ",res.data);




      return(

        <div className="w-screen h-[500px]">
                    <h1>View Users </h1>
              {
                res?.data.map((item)=>(

                     <table className="border-1">
                       <tr>
                          <th>Name</th>
                          <th>Email</th>
                       </tr>
                       <tbody>
                           <tr>
                              <td>{item.name}</td>
                              <td>{item.email}</td>
                           </tr>
                       </tbody>
                      </table>
                ))
              }


        </div>
      )
}


export default ViewUsers ;

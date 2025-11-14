import Admindashboard from "./Components/Admindashboard.jsx";
import CreateProduct from "./Components/CreateProduct.jsx";
import Customerdashboard from "./Components/Customerdashboard.jsx";
import Login from "./Components/Login";

import Signup from "./Components/Signup";
import UpdateProduct from "./Components/UpdateProduct.jsx";

import Home from "./Pages/Home.jsx";

import{Routes,Route} from "react-router-dom";

export const serverUrl = "http://localhost:4000";

import ProtectedRoute from "./Components/ProtectedRoute.jsx";






const App = ()=>{

      return (
          <div  >


            <Routes>

                <Route path={'/'} element = {<Home />} />

               <Route path={'/login'} element={<Login />} />


               <Route path={'/signup'} element={<Signup/>} />


               {/* <Route path={'/admin'} element={<Admindashboard />} />

               <Route path={'/customer'} element={<Customerdashboard />} /> */}


      <Route path="/admin" element={
    <ProtectedRoute role="admin">
      <Admindashboard />
    </ProtectedRoute>
  }
           />

<Route  path="/customer"   element={  <ProtectedRoute role="user">  <Customerdashboard />  </ProtectedRoute>} />

{/* Unauthorized Page */}
<Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />



               <Route path={'/create'} element={<CreateProduct />}  />

               <Route path={'/update/:id'} element={<UpdateProduct/>}  />

            </Routes>


          </div>
      )
}


export default App ;

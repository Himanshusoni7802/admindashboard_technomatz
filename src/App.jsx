import Admindashboard from "./Components/Admindashboard.jsx";
import CreateProduct from "./Components/CreateProduct.jsx";
import Customerdashboard from "./Components/Customerdashboard.jsx";

import Publicroute from "./Components/Publicroute.jsx";

import Login from "./Components/Login";

import Signup from "./Components/Signup";

import Home from "./Pages/Home.jsx";

import { Routes, Route } from "react-router-dom";

export const serverUrl = "http://localhost:4000";

import ProtectedRoute from "./Components/ProtectedRoute.jsx";

import ViewUsers from "./Components/ViewUsers.jsx";

import ShowallProducts from "./Components/ShowallProducts.jsx";
import ProductUpdate from "./Components/ProductUpdate.jsx";
import ProfileComponent from "./Components/ProfileComponet.jsx";
import ProfileUpdate from "./Components/ProfileUpdate.jsx";
import Cart from "./Components/Cart.jsx";




const App = () => {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={ <Home />} />
        <Route
          path={"/login"}
          element={
             <Login />
          }
        />
        <Route path={"/signup"} element={<Signup />} />

        <Route
          path="/admin"
          element={
            // <ProtectedRoute role="admin">
              <Admindashboard />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/customer"
          element={
           // <ProtectedRoute role="user">

              <Customerdashboard />
           // </ProtectedRoute>
          }
        />
        {/* Unauthorized Page */}
        <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />
        <Route path={"/create"} element={<CreateProduct />} />
        <Route path={"/update/product/:id"} element={<ProductUpdate />} />
        <Route path={"/view"} element={<ViewUsers />} />
        <Route path={"/products"} element={<ShowallProducts />} />
        <Route path={"/profile"} element={<ProfileComponent />} />
        <Route path={"/updateuserinfo"} element={<ProfileUpdate />} />

        <Route path={'/cart'} element={ <Cart />}  />

      </Routes>
    </div>
  );
};

export default App;

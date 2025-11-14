


import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("user");

  console.log(userRole);

 // console.log(typeof(userRole))


 const decode=JSON.parse(userRole)

 console.log(decode);

  // If not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If logged in but wrong role
  if (role && decode.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;



import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("user");



 const decode=JSON.parse(userRole)




  if (!token) {
    return <Navigate to="/login" replace />;
  }

  
  if (role && decode.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
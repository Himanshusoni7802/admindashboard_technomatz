import { Navigate } from "react-router-dom";

const Publicroute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  // Prevent crash if user is null
  const userobj = user ? JSON.parse(user) : null;
  const role = userobj?.role;

  // If logged in and role = admin

  if (token && role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  // If logged in and role = user

  if (token && role === "user") {
    return <Navigate to="/customer" replace />;
  }

  // If not  logged in  allow access to login page

  return children;
};

export default Publicroute;

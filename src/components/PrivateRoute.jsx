import { useAuth } from "../providers/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  const { loginStatus } = useAuth();
  console.log({ loginStatus, children });
  if (!loginStatus) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;

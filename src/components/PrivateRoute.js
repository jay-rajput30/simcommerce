import { useAuth } from "../AuthProvider";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ path, ...props }) => {
  const { loginStatus } = useAuth();

  return loginStatus ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
};

export default PrivateRoute;

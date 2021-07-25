import { useAuth } from "../AuthProvider";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ path, ...props }) => {
  const { loggedIn } = useAuth();

  return loggedIn.loginStatus ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
};

export default PrivateRoute;

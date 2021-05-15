import {useAuth} from "../AuthProvider";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ path, ...props }) => {
  const {  loggedin, loginUserWithCredentials, logoutUser } = useAuth();

  return loggedin ? (
    <Route {...props} path={path}  />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
};

export default PrivateRoute;

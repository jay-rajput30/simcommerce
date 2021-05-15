import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../AuthProvider";

const Login = () => {
  const { loggedin, loginUserWithCredentials, logoutUser  } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();

  const loginHandler = () => {
    if (!loggedin) {
      loginUserWithCredentials("userone", 123);
      // navigate(state?.from ? state.from : "/login");
    }
    logoutUser();
  };
  return (
    <div>
      <h1>Welcome to login page</h1>
      <button onCLick={loginHandler}>{loggedin ? "Logout" : "Login"}</button>
    </div>
  );
};

export default Login;

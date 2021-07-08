import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../AuthProvider";
import "./Login.css";

const Login = () => {
  // const { loggedin, loginUserWithCredentials, logoutUser  } = useAuth();
  // const { state } = useLocation();
  // const navigate = useNavigate();

  // const loginHandler = () => {
  //   if (!loggedin) {
  //     loginUserWithCredentials("userone", 123);
  //     // navigate(state?.from ? state.from : "/login");
  //   }
  //   logoutUser();
  // };

  const handleSubmit = () => {
    return null;
  };

  const formClickHandler = () => {};

  return (
    <div className="login--container">
      <form onSubmit={handleSubmit}>
        <div className="form--item">
          <label className="username--label">username</label>
          <input type="text" className="username--input" />
        </div>
        <div className="form--item">
          <label className="password--label">password</label>
          <input type="password" className="password--input" />
        </div>
        <button className="form--item" onClick={formClickHandler}>
          login
        </button>
      </form>
    </div>
  );
};

export default Login;

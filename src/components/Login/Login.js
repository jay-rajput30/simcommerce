// import { useLocation, useNavigate } from "react-router";
// import { useAuth } from "../../AuthProvider";
import "./Login.css";
import { NavLink } from "react-router-dom";

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

  const handleSubmit = (e) => {
    e.preventDefaults();
    return null;
  };

  const formClickHandler = () => {};

  return (
    <div className="main--container">
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
          <div className="button--form--item form--item">
            <button
              className="button primary--button"
              onClick={formClickHandler}
            >
              login
            </button>
          </div>
          <div className="form--item">
            <small>
              <NavLink to="/signup">sign up</NavLink>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

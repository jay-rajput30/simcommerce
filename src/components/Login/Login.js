// import { useLocation, useNavigate } from "react-router";
// import { useAuth } from "../../AuthProvider";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import axios from "axios";

const Login = () => {
  const { loggedIn, setLoggedIn } = useAuth();

  const navigate = useNavigate();
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
    e.preventDefault();
    e.target[0].value === loggedIn.username &&
    e.target[1].value === loggedIn.password
      ? setLoggedIn({ ...loggedIn, loginStatus: true })
      : setLoggedIn(setLoggedIn({ ...loggedIn, loginStatus: false }));
    loggedIn || navigate("/");
  };

  const loginHandler = async () => {
    try {
      let data = await axios.get("http://localhost:3001/user/");
      const { success, users } = data.data;
      console.log(users);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="main--container">
      <div>
        <form className="login--container" onSubmit={handleSubmit}>
          <div className="form--item">
            <label className="username--label">username</label>
            <input
              type="text"
              // id="outline--input"
              className="username--input"
            />
          </div>
          <div className="form--item">
            <label className="password--label">password</label>
            <input
              type="password"
              // id="outline--input"
              className=" password--input"
            />
          </div>
          <div
            style={{ display: "flex", justifyContent: "center" }}
            // className="form--item button--form--item"
          >
            <button onClick={loginHandler} className="button primary--button">
              login
            </button>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center" }}
            // className="form--item"
          >
            <small>
              Haven't singed up yet? <NavLink to="/signup">sign up</NavLink>
              {loggedIn}
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

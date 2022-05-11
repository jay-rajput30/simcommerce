import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import axios from "axios";
import { useState } from "react";
const Login = () => {
  const { authDispatch } = useAuth();
  const [inputUser, setInputUser] = useState({
    username: null,
    password: null,
  });

  const navigate = useNavigate();

  const loginClickHandler = async () => {
    try {
      const response = await axios.post(
        "https://simcombe.herokuapp.com/user/validate",
        {
          username: inputUser.username,
          password: inputUser.password,
        }
      );

      if (response.data?.success === true) {
        authDispatch({
          type: "USER_LOGGEDIN",
          payload: {
            userId: response.data.userId,
            wishlistItem: response.data.wishlistItem,
            cartItem: response.data.cartItem,
            token: response.data.token,
          },
        });

        localStorage.setItem(
          "userDetails",
          JSON.stringify({
            userId: response.data.userId,
            wishlistId: response.data.wishlistItem._id,
            cartId: response.data.cartItem._id,
          })
        );
        navigate("/product");
      } else {
        console.error("incorrect credentials");
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="main--container">
      <div>
        <form className="login--container" onSubmit={(e) => e.preventDefault()}>
          <div className="form--item">
            <label className="username--label">username</label>
            <input
              type="text"
              className="username--input"
              onChange={(e) => {
                setInputUser({ ...inputUser, username: e.target.value });
              }}
            />
          </div>
          <div className="form--item">
            <label className="password--label">password</label>
            <input
              type="password"
              className=" password--input"
              onChange={(e) => {
                setInputUser({ ...inputUser, password: e.target.value });
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={loginClickHandler}
              className="button primary--button"
            >
              login
            </button>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <small>
              Haven't signed up yet? <NavLink to="/signup">sign up</NavLink>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

// import { useLocation, useNavigate } from "react-router";
// import { useAuth } from "../../AuthProvider";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import { getAxiosCall } from "../../services/getAxiosCall";

const Login = () => {
  const { loginStatus, authDispatch } = useAuth();
  const [inputUser, setInputUser] = useState({
    username: null,
    password: null,
  });
  // const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   async function getUsers() {
  //     try {
  //       let { data } = await axios.get("http://localhost:3001/user/");
  //       setAllUsers([...allUsers, data.users]);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  //   getUsers();
  // }, []);

  // const setLoginDetails = (username, password) => {
  //   // authDispatch({ type: "SET_USERNAME", payload: username });
  //   // authDispatch({ type: "SET_PASSWORD", payload: password });
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  // const getDetails = (userId, username, password) => {
  //   const wishlist = axios.get(`http://localhost:3001/wishlist/${userId}`);
  //   const cart = axios.get(`http://localhost:3001/cart/${userId}`);
  //   authDispatch({ type: "SET_WISHLIST", payload: wishlist });
  //   authDispatch({ type: "SET_CART", payload: cart });
  // };

  const loginClickHandler = async () => {
    try {
      const response = await axios.post("http://localhost:3001/user/validate", {
        username: inputUser.username,
        password: inputUser.password,
      });

      if (response.data?.success === true) {
        authDispatch({
          type: "USER_LOGGEDIN",
          payload: {
            userId: response.data.userId,
            wishlistItem: response.data.wishlistItem,
            cartItem: response.data.cartItem,
          },
        });
        // authDispatch({ type: "LOG_ON", payload: true });
        // authDispatch({ type: "SET_USERID", payload: data.userId });
        // authDispatch({
        //   type: "SET_CARTID",
        //   payload: data.cartItem._id,
        // });
        // authDispatch({
        //   type: "SET_WISHLISTID",
        //   payload: data.wishlistItem._id,
        // });
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
      console.log({ loginStatus });
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
              // id="outline--input"
              className=" password--input"
              onChange={(e) => {
                setInputUser({ ...inputUser, password: e.target.value });
              }}
            />
          </div>
          <div
            style={{ display: "flex", justifyContent: "center" }}
            // className="form--item button--form--item"
          >
            <button
              onClick={loginClickHandler}
              className="button primary--button"
            >
              login
            </button>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center" }}
            // className="form--item"
          >
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

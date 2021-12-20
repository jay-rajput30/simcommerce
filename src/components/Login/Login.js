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
      const { data } = await axios.post("http://localhost:3001/user/validate", {
        username: inputUser.username,
        password: inputUser.password,
      });
      console.log({ data, inputUser });

      if (data?.success === true) {
        authDispatch({ type: "LOG_ON", payload: true });
        authDispatch({ type: "SET_USERID", payload: data.userId });
        navigate("/product");
      } else {
        console.error("incorrect credentials");
      }
      console.log({ loginStatus });

      // let loggedInUserData = await axios.get(
      //   `http://localhost:3001/user/${loggedInUser[0]._id}`
      // );

      // getDetails(
      //   loggedInUser[0]._id,
      //   loggedInUser[0].name,
      //   loggedInUser[0].password
      // );
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="main--container">
      <div>
        <form className="login--container">
          <div className="form--item">
            <label className="username--label">username</label>
            <input
              type="text"
              // id="outline--input"
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
              Haven't singed up yet? <NavLink to="/signup">sign up</NavLink>
              {loginStatus}
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

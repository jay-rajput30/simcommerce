import "./SignUp.css";
import {useState} from "react"
import axios from "axios";

const SignUp = () => {
  const [userDetails, setUserDetails] = useState({name:"", email:"", password:""})
  const handleSubmit = (e) => {
    e.preventDefault();
    return null;
  };

  const inputChangeHandler = (e) =>{
    const {name, value} = e.target;
    console.log(name, value);
    setUserDetails({...userDetails, [name]: value});
  }
  const signUpClickHandler = async () => {
    const {data}= await axios.post("http://localhost:3001/user", userDetails);
  };
  return (
    <div className="main--container">
      <div className="signup--container">
        <form onSubmit={handleSubmit}>
          <div className="form--item">
            <label className="username--label">name</label>
            <input name="name" type="text" className="username--input" onChange={inputChangeHandler} />
          </div>
          <div className="form--item">
            <label className="email--label">email</label>
            <input name="email" type="text" className="email--input" onChange={inputChangeHandler} />
          </div>
          <div className="form--item">
            <label className="password--label">password</label>
            <input name="password" type="password" className="password--input" onChange={inputChangeHandler} />
          </div>
          <div className="form--button">
            <button
              className="form--item button primary--button"
              onClick={signUpClickHandler}
            >
              sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

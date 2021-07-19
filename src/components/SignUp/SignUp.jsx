import "./SignUp.css";

const SignUp = () => {
  const handleSubmit = () => {
    return null;
  };

  const signUpClickHandler = () => {
    return null;
  };
  return (
    <div className="main--container">
      <div className="signup--container">
        <form onSubmit={handleSubmit}>
          <div className="form--item">
            <label className="username--label">username</label>
            <input type="text" className="username--input" />
          </div>
          <div className="form--item">
            <label className="email--label">email</label>
            <input type="text" className="email--input" />
          </div>
          <div className="form--item">
            <label className="password--label">password</label>
            <input type="password" className="password--input" />
          </div>
          <div className="form--item">
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

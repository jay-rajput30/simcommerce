import { IconContext } from "react-icons/lib";
import { useAuth } from "../../AuthProvider";
import { FaPowerOff } from "react-icons/fa";
import "./WelcomeUser.css";
import { useNavigate } from "react-router";

const WelcomeUser = ({ username }) => {
  const { setLoggedIn } = useAuth();
  const navigate = useNavigate();
  const logOffClickHandler = () => {
    setLoggedIn(false);
    navigate("/login");
  };
  return (
    <div className=" container">
      <div className="welcome-user--container">
        <IconContext.Provider value={{ className: "welcome--icon" }}>
          <FaPowerOff onClick={logOffClickHandler} />
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default WelcomeUser;
